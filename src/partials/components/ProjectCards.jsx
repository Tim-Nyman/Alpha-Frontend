import { useState } from 'react';
import threeDots from '../../assets/images/three_dots.svg';
import { useAuth } from '../../contexts/AuthContext';
import EditProjectModal from './Modals/EditProjectModal';
import ModalButton from './ModalButton';

const ProjectCard = ({ projects, getProjects }) => {
    const { deleteProject, editProject } = useAuth();
    const [showMenu, setShowMenu] = useState(null);


    const toggleMenu = (id) => {
        setShowMenu(showMenu === id ? null : id);
    };

    const handleEditButton = async (projectId) => {
        editProject(projectId);
        getProjects();
    };

    const handleDeleteButton = async (projectId) => {
        await deleteProject(projectId);        
        getProjects();
        setShowMenu(null)
    };

    return (
        <div id="card-container">
            {projects.map((project) => (
                <div key={project.id}>
                    <section className="card-body-projects">
                        <header>
                            <div>
                                <img src={project.image} alt="Project Image" />
                            </div>
                            <div>
                                <button
                                    className="btn-edit"
                                    onClick={() => toggleMenu(project.id)}
                                >
                                    <img src={threeDots} alt="Edit project" />
                                </button>

                                {showMenu === project.id && (
                                    <div className="dropdown-menu">
                                        <EditProjectModal project = {project} getProjects = {getProjects}></EditProjectModal>      
                                        <ModalButton type="modal-edit" target="#editProjectModal" text="Edit"></ModalButton>                                  
                                        <button onClick={() => handleDeleteButton(project.id)} className="btn-modal-edit">Delete</button>
                                    </div>
                                )}
                            </div>
                        </header>
                        <div>
                            <h2 className="h1">{project.projectName} </h2>
                        </div>
                        <div>
                            <p>{project.description}</p>
                        </div>
                        <div className="card-footer">
                            <p>{project.status.statusName}</p>
                        </div>
                    </section>
                </div>))}
        </div>
    )
}
export default ProjectCard