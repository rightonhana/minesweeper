import { FC } from "react";
import formatTime from "../../utils/formatTime";
import styles from "./Stopwatch.module.css";
import StopwatchProps from "./StopwatchProps";

export const Stopwatch: FC<StopwatchProps> = ({ timer = 0, ...props}) => (
	<div className={styles.Stopwatch} {...props}>
		<p>{formatTime(timer)}</p>
	</div>
);

export default Stopwatch;