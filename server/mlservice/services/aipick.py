# mlservice/suggestion_rating.py

import random

def compute_match(item, category, face_shape, skin_tone):
    """
    Compute realistic match percentage based on item type, face shape, and skin tone
    """
    score = 50  # base score

    if category == "hairstyles":
        if face_shape == "Round":
            if item in ["Pompadour", "Layered", "Side Part"]:
                score += 25
            elif item in ["Buzz Cut", "Bob"]:
                score += 10
        elif face_shape == "Oval":
            score += 20
        elif face_shape == "Square":
            if item in ["Bob", "Fringe"]:
                score += 20

    elif category == "specs":
        if face_shape == "Round":
            if item in ["Wayfarer", "Square"]:
                score += 25
        elif face_shape == "Square":
            if item in ["Aviator", "Round"]:
                score += 25
        elif face_shape == "Oval":
            score += 15

    elif category == "hats":
        if skin_tone.startswith("Fair"):
            if item in ["Fedora", "Beanie"]:
                score += 20
        elif skin_tone.startswith("Medium"):
            score += 15
        elif skin_tone.startswith("Dark"):
            if item in ["Panama", "Snapback"]:
                score += 20

        if face_shape == "Round" and item == "Fedora":
            score += 10

    elif category == "clothing_colors":
        if skin_tone.startswith("Fair"):
            if item in ["Red", "Blue", "Purple"]:
                score += 20
            else:
                score += 10
        elif skin_tone.startswith("Medium"):
            if item in ["Green", "Orange", "Brown"]:
                score += 20
            else:
                score += 10
        elif skin_tone.startswith("Dark"):
            if item in ["Yellow", "White", "Red"]:
                score += 20
            else:
                score += 10

    # Ensure score is within 50-95%
    score = max(50, min(score, 95))

    # Add small random noise for realism (0-5%)
    score += random.uniform(0, 5)

    return round(score, 1)


def rate_suggestions(data):
    """
    Input: dictionary with keys
        - face_shape
        - skin_tone
        - fit
        - hairstyles: list
        - specs: list
        - hats: list
        - clothing_colors: list
    Output: same structure but each suggestion is a dict with name and rating
    """
    rated_data = data.copy()

    face_shape = data.get("face_shape", "")
    skin_tone = data.get("skin_tone", "")

    rated_data["hairstyles"] = [
        {"name": item, "rating": compute_match(item, "hairstyles", face_shape, skin_tone)}
        for item in data.get("hairstyles", [])
    ]

    rated_data["specs"] = [
        {"name": item, "rating": compute_match(item, "specs", face_shape, skin_tone)}
        for item in data.get("specs", [])
    ]

    rated_data["hats"] = [
        {"name": item, "rating": compute_match(item, "hats", face_shape, skin_tone)}
        for item in data.get("hats", [])
    ]

    rated_data["clothing_colors"] = [
        {"name": item, "rating": compute_match(item, "clothing_colors", face_shape, skin_tone)}
        for item in data.get("clothing_colors", [])
    ]

    return rated_data


# Example usage
if __name__ == "__main__":
    sample_data = {
        "face_shape": "Round",
        "skin_tone": "Fair Warm",
        "fit": "Slim Fit",
        "hairstyles": ["Pompadour", "Buzz Cut", "Layered"],
        "specs": ["Wayfarer", "Round", "Aviator"],
        "hats": ["Fedora", "Beanie", "Snapback"],
        "clothing_colors": ["Red", "Blue", "Green"]
    }

    rated = rate_suggestions(sample_data)
    print(rated)
