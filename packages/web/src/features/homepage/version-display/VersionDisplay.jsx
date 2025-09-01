// packages/web/src/features/homepage/VersionDisplay.jsx
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./VersionDisplay.module.scss";
import Button from "../../../components/ui/button/Button";
import Typography from "../../../components/ui/typography/Typography";
import Icon from "../../../components/ui/icon/Icon";

const VersionDisplay = ({ versions, selectedVersion, onVersionSelect }) => {
  if (!versions || versions.length === 0) {
    return null;
  }

  const selectedIndex = versions.findIndex(
    (v) => v.sku === selectedVersion.sku
  );

  return (
    <Tabs
      className={styles.tabsContainer}
      selectedIndex={selectedIndex}
      onSelect={(index) => onVersionSelect(versions[index])}
    >
      <TabList className={styles.tabList}>
        {versions.map((version) => (
          <Tab
            key={version.sku}
            className={styles.tab}
            selectedClassName={styles.tabSelected}
          >
            {version.name}
          </Tab>
        ))}
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <div className={styles.actions}>
          <Button variant="primary">
            Explore The Model <Icon name="rightArrow" />
          </Button>
        </div>
      </TabPanel>
    </Tabs>
  );
};
export default VersionDisplay;
