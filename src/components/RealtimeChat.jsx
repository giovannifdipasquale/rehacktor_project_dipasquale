
import { useEffect, useState, useRef, useCallback } from "react";
import supabase from "../supabase/supabase-client";






export default function RealtimeChat({ data }) {
  const [messages, setMessages] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [error, setError] = useState("");
  const messageRef = useRef(null);


  const getInitialMessages = useCallback(async () => {
    setLoadingInitial(true);
    const { data: messages, error } = await supabase
      .from("messages")
      .select()
      .eq("game_id", data?.id);
    if (error) {
      setError(error.message);
      return;
    }
    setLoadingInitial(false);
    setMessages(messages);
  }, [data?.id]);

  useEffect(() => {
    if (data) {
      getInitialMessages();
    }

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => getInitialMessages()
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      channel.unsubscribe();
    };
  }, [data, getInitialMessages]);


  return (
    <div ref={messageRef} className="space-y-3 px-3 py-2">
      {loadingInitial && (
        <div className="flex justify-center py-4">
          <progress className="w-1/2" />
        </div>
      )}

      {error && (
        <article className="text-red-500 text-sm bg-red-900/20 p-3 rounded-md">
          {error}
        </article>
      )}

      {messages &&
        messages.map((message) => (
          <article
            key={message.id}
            className="
          bg-neutral-800/60 
          border border-neutral-700 
          rounded-lg 
          p-3 
          shadow-sm 
          hover:bg-neutral-800 
          transition
        "
          >
            <p className="font-semibold text-neutral-200">
              {message.profile_username}
            </p>

            <p className="text-neutral-300 mt-1">{message.content}</p>
          </article>
        ))}
    </div>
  );
}
