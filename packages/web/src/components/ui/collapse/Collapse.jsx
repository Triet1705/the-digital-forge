import React, { Children, useState } from "react";
import styles from "./Collapse.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "../typography/Typography";
import Icon from "../icon/Icon";
import clsx from "clsx";

const Collapse = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={styles.collapse}>
      <button
        className={styles.header}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Typography variant="body1" component="span" className={styles.title}>
          {title}
        </Typography>
        <div className={clsx(styles.iconWrapper, { [styles.isOpen]: isOpen })}>
          <Icon name={isOpen ? "minus" : "plus"} size={20} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={styles.content}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
