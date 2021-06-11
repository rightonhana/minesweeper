import { ReactNode } from "react";

export const when = (
	condition: boolean,
	childrenWhenTrue: ReactNode,
	childrenWhenFalse: ReactNode = null
) => (condition ? childrenWhenTrue : childrenWhenFalse);

export default when;