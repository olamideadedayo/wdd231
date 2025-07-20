
document.addEventListener("DOMContentLoaded", () => {
  const membersContainer = document.getElementById("members");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  // Toggle view
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
    fetchMembers();
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
    fetchMembers();
  });

  // Fetch and display members
  async function fetchMembers() {
    try {
      const response = await fetch("data/members.json");
      const members = await response.json();
      displayMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  }

  function displayMembers(members) {
    membersContainer.innerHTML = "";
    const isListView = membersContainer.classList.contains("list-view");
    members.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("member-card");
      if (isListView) {
        // List view: no image
        card.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="membership">Membership Level: ${member.membership}</p>
        `;
      } else {
        // Grid view: show image
        let logoPath = member.image.startsWith("images/") ? member.image : `images/${member.image}`;
        card.innerHTML = `
          <img src="${logoPath}" alt="${member.name} logo" class="member-logo" width="50" height="50" loading="lazy">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p class="membership">Membership Level: ${member.membership}</p>
        `;
      }
      membersContainer.appendChild(card);
    });
  }

  // Footer year and last modified
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  fetchMembers();
});
