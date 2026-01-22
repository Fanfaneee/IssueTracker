import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // [cite: 72]
app.use(express.json()); // [cite: 73]

let issues = [
    { id: 1, title: "Exemple", description: "Bug de démonstration", status: "OPEN", priority: "MEDIUM" } // [cite: 83, 90]
];

app.get("/issues", (req, res) => {
    res.json(issues); // [cite: 96]
});

app.post("/issues", (req, res) => {
    const newIssue = {
        id: Date.now(),
        ...req.body,
        status: "OPEN"
    }; // [cite: 101, 102]
    issues.push(newIssue);
    res.status(201).json(newIssue);
});

app.patch("/issues/:id", (req, res) => {
    const id = Number(req.params.id); // [cite: 124]
    issues = issues.map(i => i.id === id ? { ...i, status: req.body.status } : i); // [cite: 110]
    res.json({ message: "Updated" });
});

app.delete("/issues/:id", (req, res) => {
    const id = Number(req.params.id);
    issues = issues.filter(i => i.id !== id); // [cite: 116]
    res.status(204).send(); // [cite: 117]
});

app.listen(3001, () => {
    console.log("API running on http://localhost:3001"); // [cite: 77]
});