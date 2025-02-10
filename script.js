const input=document.querySelector('.input');
const button=document.querySelector('.submit');
const user_info=document.querySelector('.user_info')

const fetchGitUsers=async()=>{
    const id=input.value;
    if(!id){
        alert('Please enter a Github id');
        return;
    }

    try{
       const url=`https://api.github.com/users/${id}`
       const response=await fetch(url);
       if (!response.ok) {
        throw new Error("User not found!");
    }
    const data=await response.json();
    console.log(data);
    user_info.innerHTML=`<div class="name">
                    <p>Name :</p>
                <p>${data.login || 'N/A'}</p>
                </div>
                <div class="followers info">
                    <p>Followers :</p>
                    <p>${data.followers}</p>
                </div>
                <div class="following info">
                    <p>Followings :</p>
                    <p>${data.following}</p>
                </div>
                <div class="repos info">
                    <p>No of Repositaries :</p>
                    <p>${data.public_repos}</p>
                </div>`

                input.value=''
    }catch(err){
        console.error("Error fetching data:", err);
        alert("User not found! Please enter a valid GitHub username.");
        input.value=''
        user_info.innerHTML=''
    }
}



button.addEventListener('click',fetchGitUsers);

input.addEventListener('keydown',(e)=>{
    if(e.key==='Enter'){
        fetchGitUsers();
    }
})