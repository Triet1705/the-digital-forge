import React, { useState, useMemo } from "react";
import { useCars } from "../../hooks/usecases/useCars";
import ModelCard from "../../components/Card/ModelCard";
import styles from "./ModelListPage.module.scss";
import FilterSidebar from "../../features/modelspage/FilterSidebar";
import Typography from "../../components/ui/typography/Typography";
import Layout from "../../components/layout/Layout";

const ModelListPage = () => {
  const { cars, isLoading, isError, error } = useCars();
  const [filters, setFilters] = useState({
    carSku: "All",
    fuelTypes: {},
    bodyTypes: {},
    seats: {},
  });

  const handleResetFilters = () => {
    setFilters({
      carSku: "All",
      fuelTypes: {},
      bodyTypes: {},
      seats: {},
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredCars = useMemo(() => {
    if (!cars) return [];

    const activeFuelTypes = Object.keys(filters.fuelTypes).filter(
      (key) => filters.fuelTypes[key]
    );
    const activeBodyTypes = Object.keys(filters.bodyTypes).filter(
      (key) => filters.bodyTypes[key]
    );
    const activeSeats = Object.keys(filters.seats).filter(
      (key) => filters.seats[key]
    );

    return cars
      .filter((car) => filters.carSku === "All" || car.sku === filters.carSku)
      .filter(
        (car) =>
          activeFuelTypes.length === 0 ||
          car.fuelType?.some((type) => activeFuelTypes.includes(type))
      )
      .filter(
        (car) =>
          activeBodyTypes.length === 0 ||
          car.versions.some((version) =>
            version.bodyType?.some((type) => activeBodyTypes.includes(type))
          )
      )
      .filter(
        (car) =>
          activeSeats.length === 0 ||
          car.versions.some((version) =>
            version.seats?.some((type) => activeSeats.includes(type))
          )
      );
  }, [cars, filters]);

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
      filters={filters}
      onFilterChange={handleFilterChange}
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
