    const API_URL = "/api/products";

document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const tags = document.getElementById("tags").value.trim();

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, tags }),
  });

  if (res.ok) {
    alert("✅ Added!");
    document.getElementById("addForm").reset();
  } else {
    alert("❌ Failed to add product");
  }
});

document.getElementById("btnSearch").addEventListener("click", searchProducts);

async function searchProducts() {
  const q = document.getElementById("search").value.trim();
  const res = await fetch(`${API_URL}?q=${encodeURIComponent(q)}`);
  const data = await res.json();
  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "";

  if (data.length === 0) {
    resultEl.innerHTML = "<li>No products found.</li>";
    return;
  }

  data.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${p.name}</strong> — $${p.price} <br> <em>${p.description || ""}</em> <br><small>Tags: ${p.tags.join(", ")}</small>`;
    resultEl.appendChild(li);
  });
}
