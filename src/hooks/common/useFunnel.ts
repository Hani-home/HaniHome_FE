import { useCallback, useState } from "react";

interface UseFunnelProps {
  steps: string[];
}

const useFunnel = ({ steps }: UseFunnelProps) => {
  const [level, setStepLevel] = useState(0);

  const onNextStep = useCallback(() => {
    setStepLevel(prev => {
      if (prev >= steps.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  }, [steps]);

  const onPrevStep = useCallback(() => {
    setStepLevel(prev => {
      if (prev <= 0) {
        return 0;
      }
      return prev - 1;
    });
  }, []);

  return {
    step: steps[level],
    onNextStep,
    onPrevStep,
  };
};

export default useFunnel;
