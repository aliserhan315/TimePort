import Button from '../Components/Buttons/Buttons';
import CardList from '../Components/Card.list/Card.list';
import { useNavigate } from 'react-router-dom';



const dummyCapsules = [
  {
    name: "First Time Capsule",
    ownername: "Ali Serhan",
    ownerpfp: "",
    status: "Locked",
    creationdate: "2025-07-10",
    activationdate: "2026-07-10",
    mood: "Nostalgic"
  },
  {
    name: "Future Note to Self",
    ownername: "Maya Khoury",
    ownerpfp: "",
    status: "Pending",
    creationdate: "2025-06-01",
    activationdate: "2026-06-01",
    mood: "Hopeful"
  },
  {
    name: "Graduation Memories",
    ownername: "Jad Tamer",
    ownerpfp: "",
    status: "Opened",
    creationdate: "2024-09-15",
    activationdate: "2025-06-15",
    mood: "Excited"
  }
];


function CapsuleWall() {
  const navigate = useNavigate();
  return (
    <div className="App">
         <Button  onClick={() => navigate('/')}>to home page</Button>
   
        <CardList listcomponent={dummyCapsules} />
     
    </div>

  )
}

export default CapsuleWall
