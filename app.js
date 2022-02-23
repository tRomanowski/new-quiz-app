const cardsContainer = document.querySelector('[data-js=cards]');
const form = document.querySelector('[data-js=form]');
const filterForm = document.querySelector('[data-js=filter-form]');

let currentFilter = 'all';

let cards = [
  {
    question: 'What is HTML?',
    answer: 'HTML is Hypertext Markup Language. Google it.',
    tags: ['html', 'basic', 'web'],
  },
  {
    question: 'What is CSS?',
    answer: 'Cascading style sheets. Google it.',
    tags: ['css', 'basic', 'web'],
  },
  {
    question: 'What is Git?',
    answer: 'Git is a tool to work with code.',
    tags: ['git', 'shell'],
    isBookmarked: true,
  },
];

filterForm.addEventListener('change', () => {
  currentFilter = filterForm.elements['tag-filter'].value;
  renderCards();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const questionElement = form.elements.question;
  const answerElement = form.elements.answer;
  const tagsElement = form.elements.tags;

  const newCard = {
    question: questionElement.value,
    answer: answerElement.value,
    tags: tagsElement.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length),
  };

  cards = [newCard, ...cards];
  renderCards();

  form.reset();
  questionElement.focus();
});

renderCards();

function renderCards() {
  cardsContainer.innerHTML = '';

  cards
    .filter(
      (card) => card.tags.includes(currentFilter) || currentFilter === 'all'
    )
    .forEach((card) => {
      const cardElement = document.createElement('li');
      cardElement.className = 'card';
      cardElement.innerHTML = `
      <p>${card.question}</p>
      <button 
        class="card__bookmark ${
          card.isBookmarked ? ' card__bookmark--active' : ''
        }" 
        data-js="bookmark">
      </button>
      <button data-js="card-button">Toggle answer</button>
      <p data-js="answer" hidden>${card.answer}</p>
      <ul role="list" class="card__tag-list">
        ${card.tags.map((tag) => `<li class="card__tag">${tag}</li>`).join('')}
      </ul>
    `;
      cardsContainer.append(cardElement);

      const answerButton = cardElement.querySelector('[data-js=card-button]');
      const answerElement = cardElement.querySelector('[data-js=answer]');

      answerButton.addEventListener('click', () => {
        answerElement.toggleAttribute('hidden');
      });

      const bookmarkElement = cardElement.querySelector('[data-js=bookmark]');
      bookmarkElement.addEventListener('click', () => {
        card.isBookmarked = !card.isBookmarked;
        bookmarkElement.classList.toggle('card__bookmark--active');
      });
    });
}
