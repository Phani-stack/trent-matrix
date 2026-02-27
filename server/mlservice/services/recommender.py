def generate_recommendation(face_shape, skin_tone, height, weight, gender):

    bmi = weight / ((height/100) ** 2)

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
            "Quiff",
            "Buzz cut",
            "Fade (haircut)",
            "Layered hair",
            "Taper cut",
            "Ivy League (haircut)",
            "Comb over",
            "Caesar cut",
            "Man bun",
            "Flat top",
            "Side part (hairstyle)",
            "Curtain haircut",
            "Short back and sides",
            "Textured crop"
        ],

        "Round": [
            "Quiff",
            "Spiky hair",
            "Fringe (hair)",
            "Pompadour (hairstyle)",
            "Side part (hairstyle)",
            "Fauxhawk",
            "Undercut (hairstyle)",
            "Fade (haircut)",
            "Taper cut",
            "Layered hair",
            "Short back and sides",
            "Man bun",
            "Ivy League (haircut)",
            "Textured crop",
            "Comb over"
        ],

        "Square": [
            "Buzz cut",
            "Flat top",
            "Crew cut",
            "Side part (hairstyle)",
            "Taper cut",
            "Fade (haircut)",
            "Undercut (hairstyle)",
            "Caesar cut",
            "Comb over",
            "Ivy League (haircut)",
            "Spiky hair",
            "Pompadour (hairstyle)"
        ]
    }

    # ================= FEMALE HAIRSTYLES =================

    female_hairstyles = {

        "Oval": [
            "Bob cut",
            "Long hair",
            "Layered hair",
            "Curtain bangs",
            "Shag (haircut)",
            "Pixie cut",
            "Ponytail",
            "Chignon",
            "Braid",
            "French braid",
            "Side part (hairstyle)",
            "Middle part (hairstyle)"
        ],

        "Round": [
            "Layered hair",
            "Long hair",
            "Bob cut",
            "Shag (haircut)",
            "Curtain bangs",
            "Side part (hairstyle)",
            "Ponytail",
            "Chignon",
            "French braid",
            "Pixie cut"
        ],

        "Square": [
            "Bob cut",
            "Layered hair",
            "Long hair",
            "Shag (haircut)",
            "Curtain bangs",
            "Pixie cut",
            "Side part (hairstyle)",
            "Ponytail",
            "Chignon"
        ]
    }

    if gender.lower() == "female":
        hairstyles = female_hairstyles.get(face_shape, ["Long hair"])
    else:
        hairstyles = male_hairstyles.get(face_shape, ["Crew cut"])

    # ================= SPECS =================

    specs_db = {
        "Round": [
            "Rectangular glasses",
            "Wayfarer",
            "Aviator sunglasses",
            "Square glasses"
        ],
        "Square": [
            "Round glasses",
            "Oval glasses",
            "Aviator sunglasses"
        ],
        "Oval": [
            "Square glasses",
            "Round glasses",
            "Wayfarer",
            "Rimless glasses"
        ],
        "Rectangle": [
            "Oval glasses",
            "Round glasses",
            "Rectangular glasses"
        ],
        "Heart": [
            "Rimless glasses",
            "Oval glasses"
        ],
        "Diamond": [
            "Cat-eye glasses",
            "Oval glasses"
        ]
    }

    specs = specs_db.get(face_shape, ["Rimless glasses"])

    # ================= HATS =================

    hats_db = {
        "Round": [
            "Fedora",
            "Wide-brimmed hat",
            "Bucket hat",
            "Flat cap"
        ],
        "Square": [
            "Baseball cap",
            "Beanie",
            "Panama hat",
            "Snapback"
        ],
        "Oval": [
            "Beanie",
            "Cowboy hat",
            "Fedora",
            "Bucket hat"
        ],
        "Rectangle": [
            "Wide-brimmed hat",
            "Fedora",
            "Flat cap"
        ],
        "Heart": [
            "Wide-brimmed hat",
            "Beanie",
            "Baseball cap"
        ],
        "Diamond": [
            "Flat cap",
            "Beanie",
            "Fedora"
        ]
    }

    hats = hats_db.get(face_shape, ["Beanie"])

    # ================= COLORS =================

    if "Fair" in skin_tone:
        colors = ["Navy Blue", "Maroon", "Emerald", "Royal Blue", "Wine"]
    elif "Medium" in skin_tone:
        colors = ["Olive", "Mustard", "Rust", "Forest Green", "Burgundy"]
    else:
        colors = ["White", "Red", "Cobalt Blue", "Orange", "Purple"]

    fit = "Slim Fit" if body_type == "Lean" else \
          "Tailored Fit" if body_type == "Athletic" else \
          "Regular Fit"

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
