const postContainer = document.querySelector(".post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 3;
let page = 1;

async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data
}


async function showPost() {
    const posts = await getPost()
    posts.forEach(element => {
        postEl = document.createElement("div");
        postEl.classList.add("post");
        postEl.innerHTML = 
        `<div class="post">
        <div class="number">${element.id}</div>
        <div class="post-info">
          <h2 class="post-title">${element.title}</h2>
          <p class="post-body"> ${element.body}
          </p>
        </div>
      </div>
    </div>`

    postContainer.appendChild(postEl)
        
    });
}

showPost()

function showLoading() {
    loading.classList.add("show")

    setTimeout(() => {
    loading.classList.remove("show")
        
    setTimeout(() => {
        page++
        showPost()
            
        }, 300)



    }, 1000)
}

function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll(".post");

    posts.forEach (post => {
        const title = post.querySelector(".post-title").innerHTML.toUpperCase();
        const body = post.querySelector(".post-body").innerHTML.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    })
}

window.addEventListener("scroll", () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        console.log("Jessssss");
        showLoading()
    }
   
})

filter.addEventListener("input", filterPosts)