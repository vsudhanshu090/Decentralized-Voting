import { ethers } from "./ethers.esm.min.js";
import { abi, contractAddress } from "./constants.js";

var winner_image = document.getElementById("winner");
const connectButton = document.getElementById("connectButton");
const voteJohnButton = document.getElementById("voteJohnButton");
const voteDavidButton = document.getElementById("voteDavidButton");
const voteAmyButton = document.getElementById("voteAmyButton");
const resultButton = document.getElementById("resultButton");

connectButton.onclick = connect;
voteJohnButton.onclick = vote_john;
voteDavidButton.onclick = vote_david;
voteAmyButton.onclick = vote_amy;
//calling two functions on result
resultButton.addEventListener('click', handleClick);
async function handleClick() {
  await count_votes();
  await reset();
  await results();
}

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    connectButton.innerHTML = "CONNECTED";
  } else {
    connectButton.innerHTML = "Please install metamask";
  }
}

async function vote_john() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    await contract.vote_a({});
  }
}

async function vote_david() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    await contract.vote_b({});
  }
}

async function vote_amy() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    await contract.vote_c({});
  }
}

var a_votes=0;
var b_votes=0;
var c_votes=0;

async function count_votes(){
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    a_votes = await contract.number_a_votes();
    b_votes = await contract.number_b_votes();
    c_votes = await contract.number_c_votes();
  }
}

async function results() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    var ans = await contract.results();
    document.getElementById("counting_john_votes").innerHTML = a_votes;
    document.getElementById("counting_david_votes").innerHTML = b_votes;
    document.getElementById("counting_amy_votes").innerHTML = c_votes;
    if (ans==1){
      document.getElementById("result_screen").innerHTML = "JOHN WINS";
      winner_image.style.backgroundImage = "url('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
    else if (ans==2){
      document.getElementById("result_screen").innerHTML = "DAVID WINS";
      winner_image.style.backgroundImage = "url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
    else if (ans==3){
      document.getElementById("result_screen").innerHTML = "AMY WINS";
      winner_image.style.backgroundImage = "url('https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
    else if (ans==4){
      document.getElementById("result_screen").innerHTML = "TIE : JOHN AND DAVID";
      winner_image.style.backgroundImage = "url('https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
    else if (ans==5){
      document.getElementById("result_screen").innerHTML = "TIE : DAVID AND AMY";
      winner_image.style.backgroundImage = "url('https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
    else if (ans==6){
      document.getElementById("result_screen").innerHTML = "TIE : JOHN AND AMY";
      winner_image.style.backgroundImage = "url('https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')";
    }
    else if (ans==7){
      document.getElementById("result_screen").innerHTML = "TIE BETWEEN ALL";
      winner_image.style.backgroundImage = "url('/images/thanos.jpg')";
    }
    else{
      document.getElementById("result_screen").innerHTML = "Unexpected response";
    }
    a_votes=0;
    b_votes=0;
    c_votes=0;
  }
}

async function reset() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    await contract.reset({});
  }
}