import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
   const [name, setName] = useState("");
   const [age, setAge] = useState(0);
   const [country, setCountry] = useState("");
   const [position, setPosition] = useState("");
   const [wage, setWage] = useState(0);

   const [showEmployees, setShowEmployees] = useState(false);

   const [newWage, setNewWage] = useState(0);

   const [employeeList, setEmployeeList] = useState([]);

   const addEmployee = () => {
      Axios.post("http://localhost:3001/create", {
         name: name,
         age: age,
         country: country,
         position: position,
         wage: wage,
      }).then(() => {
         setEmployeeList([
            ...employeeList,
            {
               name: name,
               age: age,
               country: country,
               position: position,
               wage: wage,
            },
         ]);
      });
   };

   const getEmployees = () => {
      Axios.get("http://localhost:3001/employees").then((response) => {
         setEmployeeList(response.data);
      });
   };

   const updateEmployeeWage = (id) => {
      Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
         (response) => {
            setEmployeeList(
               employeeList.map((val) => {
                  return val.id == id
                     ? {
                        id: val.id,
                        name: val.name,
                        country: val.country,
                        age: val.age,
                        position: val.position,
                        wage: newWage,
                     }
                     : val;
               })
            );
         }
      );
   };

   const deleteEmployee = (id) => {
      Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
         setEmployeeList(
            employeeList.filter((val) => {
               return val.id != id;
            })
         );
      });
   };

   const showEmployeesOnClick = () => {
      getEmployees();
      setShowEmployees(!showEmployees);
   }

   const openChat = (chatId) => {
      window.open(`http://abj-pd.herokuapp.com/${chatId}`, "_blank");
   }

   return (
      <div className="App">
         <main>
            <div className="information">
               <label>Name:</label>
               <input
                  type="text"
                  onChange={(event) => {
                     setName(event.target.value);
                  }}
               />
               <label>Age:</label>
               <input
                  type="number"
                  min="18"
                  max="100"
                  onChange={(event) => {
                     setAge(event.target.value);
                  }}
               />
               <label>Country:</label>
               <input
                  type="text"
                  onChange={(event) => {
                     setCountry(event.target.value);
                  }}
               />
               <label>Position:</label>
               <input
                  type="text"
                  onChange={(event) => {
                     setPosition(event.target.value);
                  }}
               />
               <label>Wage (year):</label>
               <input
                  type="number"
                  min="0"
                  onChange={(event) => {
                     setWage(event.target.value);
                  }}
               />
               <button onClick={addEmployee}>Add Employee</button>
            </div>
            <div className="chats">
               <h2>Avaliable video chats:</h2>
               <button className="noselect" onClick={() => { openChat("intern"); }}>
                  Intern Chat
               </button>
               <button className="noselect" onClick={() => { openChat("senior") }}>
                  Senior Chat
               </button>
            </div>
         </main>
         <div className="employees">
            <button onClick={showEmployeesOnClick}>{showEmployees ? "Hide Employees" : "Show Employees"}</button>

            {showEmployees && employeeList.map((val, key) => {
               return (
                  <div className="employee">
                     <div className="employeeInfo">
                        <h3>Name: {val.name}</h3>
                        <h3>Age: {val.age}</h3>
                        <h3>Country: {val.country}</h3>
                        <h3>Position: {val.position}</h3>
                        <h3>Wage: {val.wage}</h3>
                     </div>
                     <div className="employeeUpdate">
                        <input
                           type="number"
                           min="0"
                           placeholder="Change wage"
                           onChange={(event) => {
                              setNewWage(event.target.value);
                           }}
                        />
                        <button
                           onClick={() => {
                              updateEmployeeWage(val.id);
                           }}
                        >
                           Update
                        </button>

                        <button
                           onClick={() => {
                              deleteEmployee(val.id);
                           }}
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default App;
