import React, { useEffect, useReducer } from "react";
import Occasions from "./Occasions";
import stateReducer from "../utils/stateReducer";
import { getOccasions } from "../services/occasionServices";
// import Occasion from "./Occasion";

const Home = () => {
   // const [occasionList, setOccasionList] = useState([]);

   const initialState = {
      occasionList: [],
   };
   const [store, dispatch] = useReducer(stateReducer, initialState);
   const { occasionList } = store;


   useEffect(() => {
      getOccasions()
         .then((events) => {
            dispatch({
               type: "setOccasionList",
               data: events,
            });
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <div>
         <div>
            <h1>Upcoming Events</h1>
            <Occasions occasionList={occasionList} />
         </div>
      </div>
   );
};

export default Home;