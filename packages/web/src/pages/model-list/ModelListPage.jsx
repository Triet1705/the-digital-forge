import React, { useState, useMemo } from "react";
import { useCars } from "../../hooks/usecases/useCars";
import ModelCard from "../../components/Card/ModelCard";
import styles from "./ModelListPage.module.scss";
import FilterSidebar from "../../features/modelspage/FilterSidebar";
import Typography from "../../components/ui/typography/Typography";
import Layout from "../../components/layout/Layout";

const ModelListPage = () => {
  const { cars, isLoading, isError, error } = useCars();
  const [selectedCarSku, setSelectedCarSku] = useState("All");

  const handleResetFilters = () => {
    setSelectedCarSku("All");
  };

  const filteredCars = useMemo(() => {
    if (!cars) return [];
    if (selectedCarSku === "All") return cars;
    return cars.filter((car) => car.sku === selectedCarSku);
  }, [cars, selectedCarSku]);

  if (isLoading)
    return (
      <Layout variant="sidebar" sidebar={<div>Loading...</div>}>
        <div>Loading Models...</div>
      </Layout>
    );
  if (isError)
    return (
      <Layout variant="sidebar" sidebar={<div>Error</div>}>
        <div>Error: {error.message}</div>
      </Layout>
    );

  const sidebarContent = (
    <FilterSidebar
      cars={cars}
      selectedCarSku={selectedCarSku}
      onFilterChange={setSelectedCarSku}
      onResetFilters={handleResetFilters}
    />
  );

  const mainContent = (
    <div>
      {filteredCars.map((car) => (
        <section key={car.sku} className={styles.modelGroup}>
          <Typography
            variant="h3"
            component="h2"
            className={styles.modelGroupTitle}
          >
            {car.name} Models
          </Typography>
          <div className={styles.grid}>
            {car.versions.map((version) => (
              <ModelCard key={version.sku} version={version} car={car} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );

  return (
    <Layout variant="sidebar" sidebar={sidebarContent}>
      {mainContent}
    </Layout>
  );
};

export default ModelListPage;
