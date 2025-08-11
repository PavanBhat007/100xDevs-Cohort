import { useIsOnline } from "../hooks/useIsOnline";

const IsOnline = () => {
  const isOnline = useIsOnline();

  return (
    <div>
      <h1>Are you Online?</h1>
      <p>{isOnline ? "Online :)" : "Offline :("}</p>
    </div>
  );
};

export default IsOnline;
