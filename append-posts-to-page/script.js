$(function() {
  let postsArray = [];
  let renderedPosts = [];
  const postsCount = 20;
  const renderedPostsCount = 3;

  const getData = async () => {
    const response = await fetch("https://api.myjson.com/bins/me7vk")
      .then(response => response.json())
      .then(data => {
        postsArray = data.posts;
        selectPosts(postsArray, renderedPostsCount);
      })
      .catch(error => console.error(error));
  };

  getData();

  function selectPosts(data, n) {
		let numbers = [];
		
    while (numbers.length < n) {
      let number = 0;
      do {
        number = randomIntFromInterval(1, postsCount);
      } while (numbers.includes(number));
      numbers.push(number);
    }

    for (let i = 0; i < n; i++) {
      let postIndex = numbers[i] - 1;
      renderedPosts[i] = data[postIndex];
    }

    renderPosts(renderedPosts);
  }

  function renderPosts(data) {
    let container = ".posts__wrapper";
    $(container).html("");

    $.each(data, function(i, item) {
      const { id, text } = item;

      let post = `<div class="posts__item" id="${id}">${text}</div>`;
      $(post).appendTo(container);
    });
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
});
