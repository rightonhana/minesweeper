import { FC } from "react";
import formatTime from "../../utils/formatTime";
import styles from "./Stopwatch.module.css";
import StopwatchProps from "./StopwatchProps";

export const Stopwatch: FC<StopwatchProps> = ({ timer = 0, ...props}) => (
	<span className={styles.Stopwatch} {...props}>
		{formatTime(timer)}
	</span>
);

export default Stopwatch;