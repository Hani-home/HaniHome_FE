import { useEffect } from "react";

interface AlertMessageProps {
  message: string;
  onDone: () => void;
}

const AlertMessage = ({ message, onDone }: AlertMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDone();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-mint-light text-lab1-sb fixed bottom-17 z-50 w-[343px] rounded-sm bg-gray-900 px-4 py-1 text-center">
      {message}
    </div>
  );
};

export default AlertMessage;
