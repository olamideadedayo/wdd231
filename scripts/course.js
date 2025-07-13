const courses = [
  { code: 'WDD130', name: 'Web Fundamentals', credits: 2, category: 'WDD', completed: true },
  { code: 'WDD131', name: 'Dynamic Web Fundamentals', credits: 2, category: 'WDD', completed: true },
  { code: 'WDD231', name: 'Intermediate HTML/CSS/JS', credits: 2, category: 'WDD', completed: false },
  { code: 'CSE120', name: 'Intro to Programming', credits: 2, category: 'CSE', completed: true },
  // ...add others as needed
];

const btns = document.querySelectorAll('[data-filter]');
const list = document.getElementById('courseList');
const totalEl = document.getElementById('totalCredits');

function render(filter) {
  const filtered = filter === 'all' ? courses : courses.filter(c => c.category === filter);
  list.innerHTML = '';
  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = `course-card ${c.completed ? 'completed' : 'pending'}`;
    card.innerHTML = `
      <h3>${c.code}: ${c.name}</h3>
      <span class="status-label">${c.completed ? 'Completed' : 'Pending'}</span>
    `;
    list.appendChild(card);
  });
  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  totalEl.textContent = total;
  // Highlight active filter button
  btns.forEach(b => b.classList.remove('active'));
  const activeBtn = Array.from(btns).find(b => b.dataset.filter === filter);
  if (activeBtn) activeBtn.classList.add('active');
}

btns.forEach(b => b.addEventListener('click', () => render(b.dataset.filter)));

render('all');
