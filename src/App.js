import './App.css';
import { useEffect, useState } from 'react';
import { Box, CircularProgress, Icon, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/base';

function App() {
  const [users, setUsers] = useState(undefined)
  const [filteredUsers, setFilteredUsers] = useState(undefined)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json()
    })
    .then((data) =>{      
      setUsers(data)
      setFilteredUsers(data)
    })
  }, [setUsers, setFilteredUsers])

  const searchChange = (data) => {
    setSearch(data.target.value)
    setFilteredUsers(users.filter((element) => {
      return element.name.toUpperCase().includes(data.target.value.toUpperCase()) || element.email.toUpperCase().includes(data.target.value.toUpperCase())
    }))
  }

  const searchBarStyle = {
    fieldset: {
      borderColor: "whitesmoke"
    },
    "&:hover fieldset": {
      borderColor: "whitesmoke!important"
    },
    label:{color:"grey"},
    style:{
      color: "whitesmoke"
    },
    input:{
      color: "whitesmoke"
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#121212',
    border: '2px solid #121212',
    boxShadow: 24,
    p: 4,
    pt:3,
    borderRadius:"10px",
    alignItems:"flex-start"
  };

  return (
    <div className="App">
      <h1 style={{marginTop:"0", paddingTop:"1rem"}}>Contacts</h1>
      <TextField label="Search" value={search}
      sx={searchBarStyle}
      onChange={searchChange} size="small" style={{ "width": "75%", marginBottom:"2rem"}}/>

      {
        filteredUsers === undefined ?
          <div style={{marginTop:"15%"}}>
            <CircularProgress style={{"alignSelf":"center"}}/>
          </div>
          :

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{display:"flex", justifyContent:'center'}}>
          {
            filteredUsers.length !== 0 ?
            filteredUsers.map(element => {
              return( 
                <Grid item xs="auto" key={element.id}>
                  <div key={element.id} onClick={()=>{setUser(element); setOpen(true)}} className="Contact-card">
                    <div style={{"display":'flex', "flexDirection":'column', alignItems:'flex-start', paddingLeft:"1rem"}}>
                      <h4 style={{"marginBottom":"0"}}>
                        Name:
                      </h4>
                      <p style={{"marginBottom":"0", marginTop:"0.2rem"}}>
                        {element.name}
                      </p>
                      <h4 style={{"marginBottom":"0"}}>
                        Email: 
                      </h4>
                      <p style={{"marginBottom":"0", marginTop:"0.2rem"}}>
                        {element.email}
                      </p>
                      <h4 style={{"marginBottom":"0"}}>
                        Phone: 
                      </h4>
                      <p style={{"marginBottom":"0", marginTop:"0.2rem"}}>
                        {element.phone}
                      </p>
                      <h4 style={{"marginBottom":"0"}}>
                        Company: 
                      </h4>
                      <p style={{marginTop:"0.2rem"}}>
                        {element.company.name}
                      </p>
                    </div>
                  </div>
                </Grid>
              )
            })
            :
            <Grid item xs={5} sm={4} md={4} key={1} sx={{display:"flex", justifyContent:"center"}}>
              <p>
                No Results Matching Search
              </p>
            </Grid>

          }
        </Grid>

      }

      {
        user !== undefined ?
          <Modal   
          open={open}
          onClose={()=>{setOpen(false)}}>
            <Box sx={style}>
              <div style={{display:"flex", flexDirection:"column"}}>
                <CloseIcon style={{alignSelf:"flex-end", marginTop:"0", cursor:"pointer", color:"whitesmoke"}} onClick={()=>{setOpen(false)}}/>
                <Typography className="Modal-text" variant="h4" component="h2">
                  {user.name}
                </Typography>
                <Typography className="Modal-text" textAlign="start" fontSize={19}>
                  <b>Website</b>: {user.website}
                </Typography>
                <Typography className="Modal-text" textAlign="start" fontSize={19}>
                <b>Email</b>: {user.email}
                </Typography>
                <Typography className="Modal-text" textAlign="start" fontSize={19}>
                <b>Phone</b>: {user.phone}
                </Typography>
                <Typography className="Modal-text" textAlign="start" fontSize={19}>
                <b>Company</b>: {user.company.name}
                </Typography>
                <Typography className="Modal-text" textAlign="start" fontSize={19}>
                <b>Address</b>: {user.address.suite} {user.address.street}, {user.address.city}
                </Typography>
              </div>
            </Box>
          </Modal>
          :
          <></>

      }

    </div>
  );
}

export default App;
