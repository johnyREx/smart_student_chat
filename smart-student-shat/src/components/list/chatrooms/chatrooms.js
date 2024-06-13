import "./chatrooms.css";
import { MdAdd } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

function Chatrooms() {
  return (
    <div className="chat-room-list">
      <div className="head">
        <div className="title">
          <h3>Chat Rooms</h3>
          <p>3</p>
        </div>
        <MdAdd className="add-icon" />
      </div>
      <div className="search">
        <IoMdSearch />
        <input placeholder="Search" />
      </div>
     
      <section className="chatrooms">
        <div className="subb-top">
          <img
            src="https://th.bing.com/th/id/OIP.HPy0tkbrK3-xcL-_AcvuHAHaJz?w=669&h=886&rs=1&pid=ImgDetMain"
            alt=""
          />
          <div>
            <p className="user-name">School of Hard Life</p>
            <p className="message-preview">
              <strong>Johny Rex:</strong> Hello there
            </p>
          </div>
        </div>
        <div className="subb-btm">
          <p className="time">02:26 PM</p>
          <p className="unseen-messages">192</p>
        </div>
      </section>
      <section className="chatrooms">
        <div className="subb-top">
          <img
            src="https://th.bing.com/th/id/OIP.JYwnbaBHANhwXbCZo3cFHQAAAA?rs=1&pid=ImgDetMain"
            alt=""
          />
          <div>
            <p className="user-name">React Tutorial</p>
            <p className="message-preview">
              <strong>Instructor:</strong> Hello there
            </p>
          </div>
        </div>
        <div className="subb-btm">
          <p className="time">09:48 PM</p>
          <p className="unseen-messages">15</p>
        </div>
      </section>
      <section className="chatrooms">
        <div className="subb-top">
          <img
            src="https://th.bing.com/th/id/R.9941709a6b8083b7e456d6abb65ccef4?rik=P8yc0mpzhW2rOg&riu=http%3a%2f%2f3minute.club%2fwp-content%2fuploads%2f2019%2f03%2fUdemy-logo.png&ehk=jwEFQTQP%2bdGJVM8tE4pvdhO2%2fjdRP%2bLovEmTjJqEL68%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
          <div>
            <p className="user-name">Udemy Courses and projects</p>
            <p className="message-preview">
              <strong>Johny Rex:</strong> Hello there
            </p>
          </div>
        </div>
        <div className="subb-btm">
          <p className="time">10:16 AM</p>
          <p className="unseen-messages">27</p>
        </div>
      </section>
    </div>
  );
}

export default Chatrooms;