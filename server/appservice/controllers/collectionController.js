
export const addToCollection = async (req, res) => {
    // const userId = req.user.id;
    const { analysis } = req.body;
    console.log("Received analysis data:", analysis);
    res.status(200).json({ message: "Data received successfully 2", analysis: analysis });
}
