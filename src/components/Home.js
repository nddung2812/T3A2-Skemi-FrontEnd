import React, { useEffect, useReducer, useState } from "react";
import Occasions from "./Occasions";
import stateReducer from "../utils/stateReducer";
import { StateContext } from "../utils/stateContext";
import { getOccasions } from "../services/occasionServices";
import {
   Container,
   Typography,
   Button,
   CssBaseline,
   Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getAdminById } from "../services/userServices";


const Home = ({loggedInUser}) => {
   const initialState = {
      occasions: [],
   };

   const [store, dispatch] = useReducer(stateReducer, initialState);

   useEffect(() => {
      // this function is declared in ../services/occasionServices
      getOccasions()
         .then((events) => {
            dispatch({
               type: "setOccasions",
               data: events,
            });
            console.log(events);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   const [admin, setAdmin] = useState(null);
   
   const adminUser = 1

   useEffect(() => {
      getAdminById(adminUser)
         .then((user) => setAdmin(user))
         .catch((error) => console.log(error));
   }, [adminUser]);

   if (!admin) return null;

   return (
      <>
         <CssBaseline />
         <StateContext.Provider value={{ store, dispatch }}>
            <Container maxWidth="sm">
               <Typography
                  variant="h4"
                  align="center"
                  style={{ padding: 24, marginTop: 5 }}
               >
                  Upcoming Events
               </Typography>
               {loggedInUser === admin.email &&
               <Link to="/create-event" style={{ textDecoration: "none" }}>
                  <Button type="submit" variant="contained" color="primary">
                     Create Event
                  </Button>
               </Link>
               }
               <Grid spacing={10}>
                  <Grid item>
                     <Occasions />
                  </Grid>
               </Grid>
            </Container>
         </StateContext.Provider>
      </>
   );
};

export default Home;