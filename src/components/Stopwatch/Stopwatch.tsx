import { Card, CardContent, Typography } from '@material-ui/core';
import { FC } from "react";
import formatTime from "../../utils/formatTime";
import styles from "./Stopwatch.module.css";
import StopwatchProps from "./StopwatchProps";

export const Stopwatch: FC<StopwatchProps> = ({ timer = 0, ...props}) => (
	<Card className={styles.Stopwatch} {...props}>
		<CardContent>
			<Typography className={styles.Text}>
				{formatTime(timer)}
			</Typography>
		</CardContent>
	</Card>
);

export default Stopwatch;