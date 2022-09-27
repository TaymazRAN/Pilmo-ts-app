import React from "react";
import ComplementTypeTable from "../complementType/ComplementTypeTable";
import ComplementValueTable from "../complementValue/ComplementValueTable";
import TypeTable from "../type/TypeTable";

const BaseOrganization = () => {
  return (
    <div>
      <TypeTable />
      <ComplementTypeTable />
      <ComplementValueTable />
    </div>
  );
};

export default BaseOrganization;
