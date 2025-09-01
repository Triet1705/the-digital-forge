import React from "react";
import { useCars } from "../../hooks/usecases/useCars";
import ModelCard from "../../components/Card/ModelCard";
import styles from "./ModelListPage.module.scss";

const ModelListPage = () => {
  const { cars, isLoading, isError, error } = useCars();

  if (isLoading) {
    return <div>Loading Models...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        {/* Phần FilterSidebar sẽ được thêm vào đây sau */}
      </div>
      <div className={styles.grid}>
        {cars.map((car) =>
          car.versions.map((version) => (
            <ModelCard key={version.sku} version={version} car={car} />
          ))
        )}
      </div>
    </div>
  );
};

export default ModelListPage;
