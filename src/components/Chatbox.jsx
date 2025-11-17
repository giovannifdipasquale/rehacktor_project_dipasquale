
import supabase from "../supabase/supabase-client";
import { useSession } from "../context/session/SessionContext";
import RealtimeChat from "./RealtimeChat";

export default function Chatbox({ data }) {
  const { session } = useSession();

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputMessage = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputMessage));
    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase
        .from("messages")
        .insert([
          {
            profile_id: session?.user.id,
            profile_username: session?.user.user_metadata.username,
            game_id: data.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        console.log(error);
      } else {
        inputMessage.reset();
      }
    }
  };

  return (
    <div className="bg-light m-3 py-3 border border-1 rounded-lg shadow-md">
      <div className="theme-light">
        <div className="py-4 font-bold text-center">
          <h4 className="text-3xl"> Gamers chat </h4>
        </div>
      </div>
      <div>
        <RealtimeChat data={data && data} />
      </div>
      <div className="m-4 p-4 theme-dark rounded-lg">
        <form onSubmit={handleMessageSubmit} className="w-full">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="message"
              placeholder="Chat..."
              className="
                w-full px-3 py-2
                rounded-md border border-neutral-600 bg-neutral-800 
                text-neutral-200 placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-blue-600
                transition
              "
            />
            <button
              type="submit"
              className="
                px-4 py-2 rounded-md 
                bg-light text-white text-accent cursor-pointer font-bold
                hover:bg-blue-700 active:scale-[0.98] 
                transition
              "
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
