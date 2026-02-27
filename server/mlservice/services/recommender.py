def generate_recommendation(face_shape, skin_tone, height, weight, gender):

    # ================= BMI CALCULATION =================
    bmi = weight / ((height / 100) ** 2)

    if bmi < 18.5:
        body_type = "Lean"
    elif bmi < 25:
        body_type = "Athletic"
    else:
        body_type = "Broad"

    # ================= MALE HAIRSTYLES =================

    male_hairstyles = {
    "Oval": [
        "Undercut (hairstyle)",
        "Pompadour (hairstyle)",
        "Crew cut",
        "Slicked-back hair",
        "Quiff (hairstyle)",
        "Buzz cut",
        "Fade (hairstyle)",
        "Layered hair",
        "Taper cut",
        "Ivy League (haircut)",
        "Comb over",
        "Caesar cut",
        "Man bun",
        "Flat top",
        "Side part (hairstyle)",
        "Curtain hair",
        "Short back and sides",
        "Textured crop"
    ],

    "Round": [
        "Quiff (hairstyle)",
        "Spiky hair",
        "Fringe (hairstyle)",
        "Pompadour (hairstyle)",
        "Side part (hairstyle)",
        "Faux hawk",
        "Undercut (hairstyle)",
        "Fade (hairstyle)",
        "Taper cut",
        "Layered hair",
        "Textured crop",
        "Comb over",
        "Low fade",
        "Classic taper"
    ],

    "Square": [
        "Buzz cut",
        "Flat top",
        "Crew cut",
        "Side part (hairstyle)",
        "Taper cut",
        "Fade (hairstyle)",
        "Undercut (hairstyle)",
        "Caesar cut",
        "Comb over",
        "Ivy League (haircut)",
        "Spiky hair",
        "Pompadour (hairstyle)"
    ],

    "Rectangle": [
        "Side part (hairstyle)",
        "Textured crop",
        "Classic taper",
        "Pompadour (hairstyle)",
        "Layered hair",
        "Fringe (hairstyle)"
    ],

    "Heart": [
        "Side-swept bangs",
        "Layered hair",
        "Textured hair",
        "Fringe (hairstyle)",
        "Soft quiff"
    ],

    "Diamond": [
        "Fringe (hairstyle)",
        "Layered hair",
        "Textured crop",
        "Side part (hairstyle)"
    ]
}

    # ================= FEMALE HAIRSTYLES =================

    female_hairstyles = {
    "Oval": [
        "Layered hair",
        "Bob cut",
        "Curtain bangs",
        "Shag (haircut)",
        "Pixie cut",
        "Waves (hairstyle)",
        "Curly hair",
        "Straight hair",
        "Side part (hairstyle)",
        "Middle part"
    ],

    "Round": [
        "Layered hair",
        "Side-swept bangs",
        "Straight hair",
        "Shag (haircut)",
        "Curtain bangs",
        "Ponytail"
    ],

    "Square": [
        "Layered hair",
        "Waves (hairstyle)",
        "Curtain bangs",
        "Bob cut",
        "Lob (hairstyle)"
    ],

    "Rectangle": [
        "Shoulder-length hair",
        "Curly hair",
        "Side-swept bangs"
    ],

    "Heart": [
        "Layered hair",
        "Side-swept bangs",
        "Curly hair",
        "Bob cut"
    ],

    "Diamond": [
        "Bob cut",
        "Pixie cut",
        "Side part (hairstyle)",
        "Lob (hairstyle)"
    ]
}

    # ================= SELECT HAIRSTYLES =================

    if gender.lower() == "female":
        hairstyles = female_hairstyles.get(face_shape, ["Long Layers"])
    else:
        hairstyles = male_hairstyles.get(face_shape, ["Crew Cut"])

    # ================= SPECS =================

    specs_db = {
    "Round": ["Rectangular glasses", "Wayfarer (glasses)", "Aviator sunglasses", "Square glasses"],
    "Square": ["Round glasses", "Oval glasses", "Aviator sunglasses"],
    "Oval": ["Square glasses", "Round glasses", "Wayfarer (glasses)", "Rimless glasses"],
    "Rectangle": ["Oval glasses", "Round glasses", "Rectangular glasses"],
    "Heart": ["Rimless glasses", "Oval glasses"],
    "Diamond": ["Cat-eye glasses", "Oval glasses"]
}

    specs = specs_db.get(face_shape, ["Rimless Glasses"])

    # ================= HATS =================

    hats_db = {
    "Round": ["Fedora", "Wide-brimmed hat", "Bucket hat", "Flat cap"],
    "Square": ["Baseball cap", "Beanie", "Panama hat", "Snapback"],
    "Oval": ["Beanie", "Cowboy hat", "Fedora", "Bucket hat"],
    "Rectangle": ["Wide-brimmed hat", "Fedora", "Flat cap"],
    "Heart": ["Wide-brimmed hat", "Beanie", "Baseball cap"],
    "Diamond": ["Flat cap", "Beanie", "Fedora"]
}

    hats = hats_db.get(face_shape, ["Beanie"])

    # ================= COLORS =================

    if "Fair" in skin_tone:
        colors = ["Navy Blue", "Maroon", "Emerald", "Royal Blue", "Wine"]
    elif "Medium" in skin_tone:
        colors = ["Olive", "Mustard", "Rust", "Forest Green", "Burgundy"]
    else:
        colors = ["White", "Red", "Cobalt Blue", "Orange", "Purple"]

    # ================= FIT =================

    if body_type == "Lean":
        fit = "Slim Fit"
    elif body_type == "Athletic":
        fit = "Tailored Fit"
    else:
        fit = "Regular Fit"

    return {
        "face_shape": face_shape,
        "skin_tone": skin_tone,
        "hairstyles": hairstyles,
        "specs": specs,
        "hats": hats,
        "clothing_colors": colors,
        "fit": fit,
        "product_link": f"https://www.amazon.in/s?k={colors[0]}+{fit}+shirt"
    }
