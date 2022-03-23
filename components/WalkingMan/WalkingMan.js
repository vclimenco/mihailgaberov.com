import {
  Alignment,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "rive-react";
import useTimeout from "../../hooks/useTimeout.hook";
import styles from "./WalkingMan.module.scss";

const STATE_MACHINE_NAME = "SM_Walking_Man";
const INPUT_CROSS_SCREEN = "Cross the screen";

export const WalkingMan = () => {
  const { rive, RiveComponent } = useRive({
    src: "walking_man.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    artboard: "New Artboard",
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.CenterLeft,
    }),
  });

  const crossScreenInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_CROSS_SCREEN
  );

  useTimeout(() => {
    if (crossScreenInput) {
      crossScreenInput.fire();
    }
  }, 1000);

  return (
    <div className={styles.walkingMan}>
      <RiveComponent />
    </div>
  );
};
