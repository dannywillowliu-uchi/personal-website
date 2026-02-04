import { Variants } from "framer-motion";

export const pageTransition: Variants = {
	initial: {
		opacity: 0,
		scale: 0.98,
	},
	animate: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	exit: {
		opacity: 0,
		scale: 1.02,
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 1, 1],
		},
	},
};

export const fadeIn: Variants = {
	initial: {
		opacity: 0,
		y: 10,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: "easeOut",
		},
	},
};

export const staggerContainer: Variants = {
	initial: {},
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const roomObjectHover: Variants = {
	initial: {
		scale: 1,
	},
	hover: {
		scale: 1.02,
		transition: {
			duration: 0.2,
			ease: "easeOut",
		},
	},
	tap: {
		scale: 0.98,
	},
};

export const floatAnimation: Variants = {
	initial: {
		y: 0,
	},
	animate: {
		y: [-2, 2, -2],
		transition: {
			duration: 4,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};
