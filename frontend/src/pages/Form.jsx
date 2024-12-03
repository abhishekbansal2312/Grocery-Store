import React, { useState, useEffect } from "react";

export default function Form() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, form]);
    setForm({ name: "", email: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Enter your Email"
          required
        />

        <button type="submit" disabled={!form.name || !form.email}>
          Submit
        </button>
      </form>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
