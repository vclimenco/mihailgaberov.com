import {
  useStateMachineInput,
  useRive,
  Layout,
  Fit,
  Alignment,
} from "rive-react";
import styles from "./WalkingMan.module.scss";

const STATE_MACHINE_NAME = "SM_Walking_Man";
const INPUT_CROSS_SCREEN = "Cross the screen";

export const WalkingMan = () => {
  const { rive, RiveComponent } = useRive({
    src: "walking-man.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    artboard: "New Artboard",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.CenterLeft,
    }),
  });

  const crossScreenInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    INPUT_CROSS_SCREEN
  );

  return (
    <div className={styles.walkingMan}>
      <RiveComponent onClick={() => crossScreenInput.fire()} />
    </div>
  );
};
