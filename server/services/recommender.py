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
            "Undercut","Pompadour","Crew Cut","Slick Back","Quiff",
            "Buzz Cut","Fade Cut","Layered Cut","High Fade","Low Fade",
            "Spiky Top","Classic Taper","Ivy League","Comb Over",
            "Caesar Cut","Drop Fade","Bro Flow","Hard Part",
            "Textured Crop","Side Sweep"
        ],

        "Round": [
            "High Volume Quiff","Spiky Hair","Angular Fringe",
            "Pompadour","Side Part","Faux Hawk","Hard Part",
            "Mid Fade","Messy Crop","Disconnected Undercut",
            "Classic Fade","Low Taper","Layered Quiff",
            "Short Back & Sides","Top Knot","High Fade",
            "Taper Fade","Textured Top","Modern Ivy","Short Quiff"
        ],

        "Square": [
            "Buzz Cut","Flat Top","Crew Cut","Side Part",
            "Taper Cut","High Fade","Military Cut","Angular Crop",
            "Clean Fade","Hard Side Part","Low Fade","Mid Fade",
            "Slick Back","Textured Spikes","Short Pompadour",
            "Short Comb Over","Modern Ivy","Classic Taper",
            "Tight Crop","Short Spikes"
        ],

        "Rectangle": [
            "Textured Fringe","Medium Layers","Soft Quiff",
            "Low Fade","Classic Taper","Side Sweep",
            "Balanced Pompadour","Messy Medium",
            "Layered Waves","Modern Crop",
            "Soft Undercut","Light Fringe",
            "Mid Taper","Loose Texture",
            "Natural Flow","Subtle Fade"
        ],

        "Heart": [
            "Side Swept","Layered Medium Cut",
            "Textured Top","Messy Fringe",
            "Soft Quiff","Low Volume Pompadour",
            "Classic Taper","Bro Flow",
            "Shoulder Length","Casual Undercut",
            "Layered Waves","Side Fringe",
            "Loose Texture","Light Fade",
            "Modern Taper","Balanced Medium"
        ],

        "Diamond": [
            "Textured Fringe","Side Part","Classic Taper",
            "Mid Fade","Long Layers","Slick Back",
            "Soft Fringe","Layered Quiff",
            "High Volume Top","Long Side Sweep",
            "Loose Waves","Low Taper",
            "Modern Medium","Messy Volume",
            "Casual Crop"
        ]
    }

    # ================= FEMALE HAIRSTYLES =================

    female_hairstyles = {

        "Oval": [
            "Long Layers","Beach Waves","Blunt Bob","Curtain Bangs",
            "Soft Curls","High Ponytail","Layered Lob",
            "Side Part Waves","Straight Middle Part",
            "Textured Bob","Loose Waves","Long Sleek Hair",
            "Feathered Layers","Soft Shag","Half Up Style",
            "Braided Crown","Shoulder Waves",
            "Side Swept Bangs","Layered Curls","Elegant Bun"
        ],

        "Round": [
            "Long Layers with Volume","High Ponytail",
            "Side Swept Bangs","Layered Lob",
            "Textured Bob","Long Straight Hair",
            "Soft Waves","Half Up Style",
            "Feathered Cut","Deep Side Part",
            "Shoulder Length Cut","Soft Shag",
            "Layered Curls","Elegant Bun",
            "Loose Waves","Side Braids",
            "Asymmetrical Bob","High Bun",
            "Cascading Waves","Soft Fringe"
        ],

        "Square": [
            "Soft Layers","Long Waves","Side Part",
            "Loose Curls","Layered Lob","Curtain Bangs",
            "Feathered Cut","Shoulder Waves",
            "Textured Bob","Soft Shag",
            "High Ponytail","Half Up Half Down",
            "Side Swept Hair","Elegant Bun",
            "Long Braids","Loose Waves",
            "Blunt Bob","Beach Waves",
            "Layered Curls","Modern Shag"
        ],

        "Rectangle": [
            "Layered Waves","Soft Curls",
            "Long Volume Hair","Side Fringe",
            "Shoulder Length Cut","Feathered Layers",
            "Soft Shag","Loose Curls",
            "Half Up Style","Curtain Bangs",
            "Long Sleek Hair","Medium Waves",
            "Balanced Lob","Classic Bun",
            "Low Ponytail","Layered Bob"
        ],

        "Heart": [
            "Chin Length Bob","Side Swept Bangs",
            "Long Soft Waves","Layered Lob",
            "Soft Curls","Deep Side Part",
            "Loose Ponytail","Feathered Layers",
            "Shoulder Waves","Modern Shag",
            "Long Layers","Half Up Style",
            "Curtain Bangs","Textured Bob",
            "Soft Fringe","Elegant Bun"
        ],

        "Diamond": [
            "Shoulder Length Waves","Side Part",
            "Soft Shag","Layered Lob",
            "Long Layers","Loose Curls",
            "Half Up Style","Feathered Cut",
            "Soft Fringe","Long Sleek Hair",
            "Textured Bob","Medium Waves",
            "Balanced Layers","High Ponytail",
            "Elegant Bun","Classic Blowout"
        ]
    }

    # Select hairstyle DB
    if gender.lower() == "female":
        hairstyles = female_hairstyles.get(face_shape, ["Classic Long Hair"])
    else:
        hairstyles = male_hairstyles.get(face_shape, ["Classic Cut"])

    # ================= SPECS =================

    specs_db = {
        "Round": ["Rectangular Frames","Wayfarer","Sharp Edge Frames","Bold Square Frames"],
        "Square": ["Round Frames","Oval Frames","Aviators","Soft Edge Frames"],
        "Oval": ["Square Frames","Round Frames","Wayfarer","Rimless"],
        "Rectangle": ["Oval Frames","Round Frames","Bold Rectangular"],
        "Heart": ["Light Rimless","Oval Frames","Thin Frame Glasses"],
        "Diamond": ["Cat Eye","Oval Frames","Soft Curved Frames"]
    }

    specs = specs_db.get(face_shape, ["Classic Frame"])

    # ================= HATS =================

    hats_db = {
        "Round": ["Fedora","Wide Brim Hat","Bucket Hat","Flat Cap"],
        "Square": ["Baseball Cap","Beanie","Panama Hat","Snapback"],
        "Oval": ["Beanie","Cowboy Hat","Fedora","Bucket Hat"],
        "Rectangle": ["Wide Brim","Fedora","Flat Cap"],
        "Heart": ["Wide Brim","Soft Beanie","Structured Cap"],
        "Diamond": ["Flat Cap","Beanie","Short Fedora"]
    }

    hats = hats_db.get(face_shape, ["Casual Cap"])

    # ================= COLORS =================

    if "Fair" in skin_tone:
        colors = ["Navy Blue","Maroon","Emerald","Royal Blue","Wine"]
    elif "Medium" in skin_tone:
        colors = ["Olive","Mustard","Rust","Forest Green","Burgundy"]
    else:
        colors = ["White","Red","Cobalt Blue","Orange","Purple"]

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