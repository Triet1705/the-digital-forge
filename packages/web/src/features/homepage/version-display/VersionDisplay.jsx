// packages/web/src/features/homepage/VersionDisplay.jsx
import React from "react";
import styles from "./VersionDisplay.module.scss";
import Button from "../../../components/ui/button/Button";
import Typography from "../../../components/ui/typography/Typography";

const VersionDisplay = ({ versions, selectedVersion, onVersionSelect }) => {
  if (!versions || versions.length === 0) {
    return null;
  }

  if (versions.length > 1) {
    return (
      <div className={styles.container}>
        <Typography variant="body2">
          Multiple versions UI (Tabs) coming soon...
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant="h3" component="h4" className={styles.versionName}>
        {selectedVersion.name}
      </Typography>
      <div className={styles.actions}>
        <Button variant="primary">Explore The Model</Button>
      </div>
    </div>
  );
};

export default VersionDisplay;
