import { MutableRefObject, useEffect, useState } from "react";

interface UseCircularLayoutProps {
  skillsContainer: MutableRefObject<HTMLDivElement | null>,
  skillsInner: MutableRefObject<HTMLDivElement | null>,
  skillLength: number
}

export default function useCircularLayout({ skillsContainer, skillsInner, skillLength }: UseCircularLayoutProps) {
  const [rad, setRad] = useState<number>();
  const [r, setR] = useState<number>();
  const [radOffset, setRadOffset] = useState<number>();

  useEffect(() => {
    if (skillsContainer.current && skillsInner.current && skillLength > 0) {
      const deg = 360.0 / skillLength;
      let circleRadius
      if (skillsContainer.current.clientHeight > skillsContainer.current.clientWidth) {
        circleRadius = skillsContainer.current.clientWidth / 2 - skillsInner.current.clientWidth / 2;
      } else {
        circleRadius = skillsContainer.current.clientHeight / 2 - skillsInner.current.clientHeight / 2;
      }
      const radianOffset = -Math.PI / 2;
      const angleInRadians = deg * Math.PI / 180.0;
      setRad(angleInRadians);
      setR(circleRadius);
      setRadOffset(radianOffset);
    }
  }, [skillLength, skillsInner, skillsContainer]);

  return { rad, r, radOffset }
}