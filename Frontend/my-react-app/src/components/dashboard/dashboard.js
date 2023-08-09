import React, { useContext, useState } from "react";
import AuthContext from "../../context/contextProvider";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListIcon from "@material-ui/icons/List";
import EditProfile from "../profile/editProfile";
import AddItem from "../seller/addItem";
import AllOrders from "../seller/allOrders";
import NewOrders from "../seller/newOrders";
import styles from "./dashboard.css"; // Pretpostavka da je vaš CSS fajl nazvan dashboard.css

const Dashboard = () => {
  const context = useContext(AuthContext);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const openComponent = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="dashboardDiv">
      <div className="leftSideDiv">
        {/* Dodajte uvjetni prikaz za prodavca */}
        {/* {context.type === "Prodavac" && */(
          <>
            <Link className="links" onClick={() => openComponent("EditProfile")}>
              <Button startIcon={<EditIcon />} variant="contained">
                Profil
              </Button>
            </Link>
            <Link className="links" onClick={() => openComponent("AddItem")}>
              <Button startIcon={<AddIcon />} variant="contained">
                Dodaj proizvod
              </Button>
            </Link>
            <Link className="links" onClick={() => openComponent("NewOrders")}>
              <Button startIcon={<AssignmentIcon />} variant="contained">
                Nove porudzbine
              </Button>
            </Link>
            <Link className="links" onClick={() => openComponent("AllOrders")}>
              <Button startIcon={<ListIcon />} variant="contained">
                Sve porudzbine
              </Button>
            </Link>
          </>
        )}
      </div>

      <div className="rightSideDiv">
        {selectedComponent === "EditProfile" && <EditProfile />}
        {selectedComponent === "AddItem" && <AddItem />}
        {selectedComponent === "NewOrders" && <NewOrders />}
        {selectedComponent === "AllOrders" && <AllOrders />}
      </div>
    </div>
  );
};

export default Dashboard;
