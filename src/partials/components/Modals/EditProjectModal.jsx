import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';


const EditProjectModal = ({ project, getProjects }) => {
    const { authFetch } = useAuth();
    const { editProject } = useAuth();
    const [clients, setClients] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState([]);

    const projectId = project.id;
    const [projectName, setProjectName] = useState(project.projectName);
    const [clientId, setClientId] = useState(project.client.id);
    const [description, setDescription] = useState(project.description);
    const [startDate, setStartDate] = useState(project.startDate);
    const [endDate, setEndDate] = useState(project.endDate);
    const [projectOwner, setProjectOwner] = useState(project.user.id);
    const [budget, setBudget] = useState(project.budget)
    const [projectStatus, setProjectStatus] = useState(project.status.id)

    const getClients = async () => {
        const res = await authFetch("https://asp-net-backend.azurewebsites.net/api/Clients");
        const data = await res.json();
        setClients(data);
    }

    const getStatus = async () => {
        const res = await authFetch("https://asp-net-backend.azurewebsites.net/api/Status");
        const data = await res.json();
        setStatus(data);
    }

    const getUsers = async () => {
        const res = await authFetch("https://asp-net-backend.azurewebsites.net/api/Users");
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => {
        getClients();
        getUsers();
        getStatus();
    }, []);

    const ButtonCloseModal = () => {
        document.getElementById("editProjectModal").close();
    };

    const ButtonSubmitForm = async (e) => {
        e.preventDefault();

        await editProject({
            projectId,
            image: null,
            projectName,
            description,
            budget,
            startDate,
            endDate,
            clientId: clientId,
            userId: projectOwner,
            statusId: projectStatus
        });
        
        getProjects();
        ButtonCloseModal();
    };


    return (
        <dialog id="editProjectModal" className="modal">
            <section className="modal-content">
                <header>
                    <h1>
                        Edit Project
                    </h1>
                    <button className="btn-close" onClick={ButtonCloseModal}></button>
                </header>

                <div>
                    <form>
                        <div>
                            <label htmlFor="projectName" className="h6">Project name</label>
                            <input
                                id="projectName"
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="clientName"className="h6">Client name</label>
                            <select
                                id="clientName"
                                value={clientId}
                                onChange={e => setClientId(e.target.value)}
                            >
                                {clients.map((client) => (
                                    <option key={client.id} value={client.Id}>
                                        {client.clientName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description" className="h6">Description</label>
                            <textarea
                                type="text"
                                name=""
                                id="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div>
                            <div>
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="owner">Project Owner</label>
                            <select
                                type="text"
                                id="owner"
                                value={projectOwner}
                                onChange={e => setProjectOwner(e.target.value)}
                            >
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="budget">Budget</label>
                            <input
                                type="number"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="projectStatus" className="h6">Project Status</label>
                            <select
                                type="text"
                                value={projectStatus}
                                onChange={e => setProjectStatus(e.target.value)}
                                id="projectStatus"
                            >
                                {status.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.statusName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="btn-group">
                            <button className="btn btn-submit" type="submit" onClick={ButtonSubmitForm}>Save</button>
                        </div>
                    </form>
                </div>
            </section>
        </dialog>
    )
}

export default EditProjectModal