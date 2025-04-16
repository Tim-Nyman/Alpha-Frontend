import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';


const AddProjectModal = ({ getProjects }) => {

  const { authFetch } = useAuth();
  const { addProject } = useAuth();
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectName, setProjectName] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [budget, setBudget] = useState(0);

  const getClients = async () => {
    const res = await authFetch("https://localhost:7167/api/Clients");
    const data = await res.json();
    console.log("Fetched Clients:", data);
    setClients(data);
  }

  const getUsers = async () => {
    const res = await authFetch("https://localhost:7167/api/Users");
    const data = await res.json();
    console.log("Fetched Users:", data);
    setUsers(data);
  }

  useEffect(() => {
    getClients();
    getUsers();
  }, []);


  const ButtonCloseModal = () => {
    document.getElementById("addProjectModal").close();
  };

  const ButtonSubmitForm = async (e) => {
    e.preventDefault();

    await addProject({
      image: null,
      projectName,
      description,
      budget,
      startDate,
      endDate,
      clientId: selectedClient,
      userId: projectOwner,
    });

    await getProjects();
    ButtonCloseModal();
  };

  return (
    <dialog id="addProjectModal" className="modal">
      <section className="modal-content">
        <header>
          <h1>
            Add Project
          </h1>
          <button className="btn-close" onClick={ButtonCloseModal}></button>
        </header>

        <div>
          <form>
            <div>
              <label htmlFor="projectName" className="h6">Project name</label>
              <input
                id="projectName"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="clients" className="h6">Client Name</label>
              <select
                name="clients"
                id="clients"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                <option value="" >Choose a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="h6">Description</label>
              <textarea
                type="text"
                id="description"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="startDate" className="h6">Start date</label>
              <input
                type="date"
                id="startDate"
                placeholder="Enter a valid start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="endDate" className="h6">End date</label>
              <input
                type="date"
                id="endDate"
                placeholder="Enter a valid end date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="projectOwner" className="h6">Project Owner</label>
              <select
                name=""
                id="projectOwner"
                value={projectOwner}
                onChange={(e) => setProjectOwner(e.target.value)}
              >
                <option value="">Choose a project owner</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="h6">Budget</label>
              <input
                type="number"
                id="budget"
                placeholder="$0.00"
                min="0"
                step="1.00"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value))}
              />
            </div>

            <div className="btn-group">
              <button className="btn btn-submit" type="submit" onClick={ButtonSubmitForm}>Add Project</button>
            </div>

          </form>
        </div>

      </section>
    </dialog>
  )
}

export default AddProjectModal