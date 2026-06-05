#!/usr/bin/env python3
"""
Fetch one image per slide using Wikipedia's REST API (article thumbnails).
Each slide maps to the most relevant Wikipedia article — gives the actual
encyclopedia image for that topic, not random search results.

Usage: python3 scripts/fetch-slide-images.py
Images saved to: public/images/lessons/lesson-{id}/slide-{n}.jpg
"""

import os, time, urllib.request, json, urllib.parse

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT  = os.path.join(ROOT, 'public', 'images', 'lessons')

# Each entry: (lesson_id, slide_0index) -> Wikipedia article title
# Using exact Wikipedia article titles for the best thumbnail match
WIKI_ARTICLES = {
    # ── Lesson 1: History of AI ──────────────────────────────────────────────
    (1, 0): "Aristotle",
    (1, 1): "Ada_Lovelace",
    (1, 2): "Alan_Turing",
    (1, 3): "Dartmouth_workshop",
    (1, 4): "AI_winter",
    (1, 5): "Deep_Blue_(chess_computer)",
    (1, 6): "AlexNet",
    (1, 7): "ChatGPT",
    # ── Lesson 2: What AI Does ───────────────────────────────────────────────
    (2, 0): "Pattern_recognition",
    (2, 1): "Machine_learning",
    (2, 2): "Image_recognition",
    (2, 3): "Training_data",
    (2, 4): "Artificial_intelligence",
    (2, 5): "Deep_learning",
    (2, 6): "Overfitting",
    (2, 7): "Algorithmic_bias",
    # ── Lesson 3: AI In Your Life ────────────────────────────────────────────
    (3, 0): "Smartphone",
    (3, 1): "Social_media",
    (3, 2): "Search_engine",
    (3, 3): "Facial_recognition_system",
    (3, 4): "Automated_decision-making",
    (3, 5): "Artificial_intelligence_in_healthcare",
    (3, 6): "GPS_navigation_device",
    (3, 7): "Internet_of_things",
    # ── Lesson 4: Narrow vs General AI ──────────────────────────────────────
    (4, 0): "Narrow_artificial_intelligence",
    (4, 1): "Deep_Blue_(chess_computer)",
    (4, 2): "Artificial_general_intelligence",
    (4, 3): "Large_language_model",
    (4, 4): "Artificial_general_intelligence",
    (4, 5): "Artificial_general_intelligence",
    (4, 6): "Turing_test",
    (4, 7): "Artificial_intelligence",
    # ── Lesson 5: How AI Learns ──────────────────────────────────────────────
    (5, 0): "Machine_learning",
    (5, 1): "Supervised_learning",
    (5, 2): "Unsupervised_learning",
    (5, 3): "Training_data",
    (5, 4): "Reinforcement_learning",
    (5, 5): "Overfitting",
    (5, 6): "Data_labeling",
    (5, 7): "Artificial_intelligence",
    # ── Lesson 6: What AI Gets Wrong ────────────────────────────────────────
    (6, 0): "Hallucination_(artificial_intelligence)",
    (6, 1): "Hallucination_(artificial_intelligence)",
    (6, 2): "Algorithmic_bias",
    (6, 3): "Edge_case",
    (6, 4): "Natural_language_processing",
    (6, 5): "Algorithmic_accountability",
    (6, 6): "Artificial_intelligence",
    (6, 7): "AI_safety",
    # ── Lesson 7: What Is AI? ────────────────────────────────────────────────
    (7, 0): "Artificial_intelligence",
    (7, 1): "Turing_test",
    (7, 2): "Artificial_intelligence",
    (7, 3): "Artificial_general_intelligence",
    (7, 4): "Philosophy_of_artificial_intelligence",
    (7, 5): "Chinese_room",
    (7, 6): "Philosophy_of_artificial_intelligence",
    (7, 7): "Artificial_intelligence",
    # ── Lesson 8: What Is A Neural Network ──────────────────────────────────
    (8, 0): "Artificial_neural_network",
    (8, 1): "Neuron",
    (8, 2): "Perceptron",
    (8, 3): "Deep_learning",
    (8, 4): "Biological_neuron_model",
    (8, 5): "Artificial_neural_network",
    (8, 6): "ChatGPT",
    (8, 7): "Emergence",
    # ── Lesson 9: How Networks Train ────────────────────────────────────────
    (9, 0): "Loss_function",
    (9, 1): "Gradient_descent",
    (9, 2): "Backpropagation",
    (9, 3): "Stochastic_gradient_descent",
    (9, 4): "Overfitting",
    (9, 5): "Regularization_(mathematics)",
    (9, 6): "Training,_validation,_and_test_data_sets",
    (9, 7): "Deep_learning",
    # ── Lesson 10: Deep Learning ─────────────────────────────────────────────
    (10, 0): "Deep_learning",
    (10, 1): "Convolutional_neural_network",
    (10, 2): "AlexNet",
    (10, 3): "Graphics_processing_unit",
    (10, 4): "Transfer_learning",
    (10, 5): "Residual_neural_network",
    (10, 6): "Deep_learning",
    (10, 7): "Representation_learning",
    # ── Lesson 11: How ChatGPT Works ─────────────────────────────────────────
    (11, 0): "ChatGPT",
    (11, 1): "Large_language_model",
    (11, 2): "Transformer_(deep_learning_architecture)",
    (11, 3): "Tokenization_(linguistics)",
    (11, 4): "Context_window",
    (11, 5): "Transformer_(deep_learning_architecture)",
    (11, 6): "Hallucination_(artificial_intelligence)",
    (11, 7): "Turing_test",
    # ── Lesson 12: Recommendation Algorithms ────────────────────────────────
    (12, 0): "Recommender_system",
    (12, 1): "Collaborative_filtering",
    (12, 2): "Filter_bubble",
    (12, 3): "Cold_start_(recommender_systems)",
    (12, 4): "Recommender_system",
    (12, 5): "Algorithmic_radicalization",
    (12, 6): "Feedback_loop",
    (12, 7): "Persuasive_technology",
    # ── Lesson 13: Computer Vision ───────────────────────────────────────────
    (13, 0): "Computer_vision",
    (13, 1): "Convolutional_neural_network",
    (13, 2): "Object_detection",
    (13, 3): "Facial_recognition_system",
    (13, 4): "Artificial_intelligence_in_healthcare",
    (13, 5): "Self-driving_car",
    (13, 6): "Adversarial_machine_learning",
    (13, 7): "Computer_vision",
    # ── Lesson 14: The Black Box Problem ─────────────────────────────────────
    (14, 0): "Explainable_artificial_intelligence",
    (14, 1): "Black_box",
    (14, 2): "Explainable_artificial_intelligence",
    (14, 3): "Explainable_artificial_intelligence",
    (14, 4): "Explainable_artificial_intelligence",
    (14, 5): "Algorithmic_accountability",
    (14, 6): "Artificial_Intelligence_Act",
    (14, 7): "Explainable_artificial_intelligence",
    # ── Lesson 15: When Decisions Go Wrong ───────────────────────────────────
    (15, 0): "Algorithmic_decision-making",
    (15, 1): "COMPAS_(software)",
    (15, 2): "Algorithmic_bias",
    (15, 3): "Content_moderation",
    (15, 4): "Automated_decision-making",
    (15, 5): "Artificial_intelligence_in_healthcare",
    (15, 6): "Algorithmic_accountability",
    (15, 7): "AI_safety",
    # ── Worlds 3-8 (lessons 16-63) ───────────────────────────────────────────
    # World 3: AI and Society
    (16, 0): "Automation", (16,1): "Technological_unemployment", (16,2): "Artificial_intelligence",
    (16,3): "Artificial_intelligence", (16,4): "Future_of_work", (16,5): "Universal_basic_income",
    (16,6): "Automation", (16,7): "Future_of_work",
    (17, 0): "Artificial_intelligence_art", (17,1): "Generative_art", (17,2): "Artificial_intelligence_art",
    (17,3): "Copyright", (17,4): "Music_and_artificial_intelligence", (17,5): "Creativity",
    (17,6): "Artificial_intelligence_art", (17,7): "Creativity",
    (18, 0): "Privacy", (18,1): "Mass_surveillance", (18,2): "Data_privacy",
    (18,3): "Facial_recognition_system", (18,4): "Data_breach", (18,5): "Location_data",
    (18,6): "Surveillance_capitalism", (18,7): "Privacy_law",
    (19, 0): "Artificial_intelligence_in_healthcare", (19,1): "Medical_diagnosis",
    (19,2): "Medical_imaging", (19,3): "Drug_discovery", (19,4): "Electronic_health_record",
    (19,5): "Health_equity", (19,6): "Artificial_intelligence_in_healthcare", (19,7): "Medicine",
    (20, 0): "Educational_technology", (20,1): "Personalized_learning", (20,2): "Academic_dishonesty",
    (20,3): "Intelligent_tutoring_system", (20,4): "Student_data_privacy", (20,5): "Digital_divide",
    (20,6): "Educational_technology", (20,7): "Education",
    (21, 0): "Fake_news", (21,1): "Deepfake", (21,2): "Political_advertising",
    (21,3): "Election_interference", (21,4): "Misinformation", (21,5): "Fact-checking",
    (21,6): "Internet_censorship", (21,7): "Democracy",
    (22, 0): "AlphaFold", (22,1): "Protein_structure_prediction", (22,2): "Climate_model",
    (22,3): "Drug_discovery", (22,4): "Astronomy", (22,5): "Genomics",
    (22,6): "Scientific_method", (22,7): "Science",
    (23, 0): "Smart_city", (23,1): "Recommender_system", (23,2): "Navigation",
    (23,3): "E-commerce", (23,4): "Virtual_assistant", (23,5): "Deepfake",
    (23,6): "Artificial_intelligence", (23,7): "Technology",
    # World 4: AI Ethics
    (24, 0): "Ethics", (24,1): "Machine_ethics", (24,2): "Artificial_intelligence",
    (24,3): "Trolley_problem", (24,4): "Applied_ethics", (24,5): "Risk–benefit_ratio",
    (24,6): "Ethical_code", (24,7): "AI_safety",
    (25, 0): "Algorithmic_bias", (25,1): "Demographic_parity", (25,2): "Fairness_(machine_learning)",
    (25,3): "Impossibility_theorem", (25,4): "Training_data", (25,5): "COMPAS_(software)",
    (25,6): "Institutional_racism", (25,7): "Social_justice",
    (26, 0): "Informed_consent", (26,1): "Data_privacy", (26,2): "Terms_of_service",
    (26,3): "Opt-out", (26,4): "Children's_Online_Privacy_Protection_Act", (26,5): "Surveillance_capitalism",
    (26,6): "Digital_rights", (26,7): "Privacy_law",
    (27, 0): "Algorithmic_accountability", (27,1): "Moral_responsibility", (27,2): "Corporate_accountability",
    (27,3): "Product_liability", (27,4): "AI_safety", (27,5): "Governance",
    (27,6): "Regulation", (27,7): "Policy",
    (28, 0): "Transparency_(behavior)", (28,1): "Open_source", (28,2): "Black_box",
    (28,3): "Explainable_artificial_intelligence", (28,4): "Trade_secret", (28,5): "Algorithm_audit",
    (28,6): "Transparency_report", (28,7): "Paradox",
    (29, 0): "Autonomy", (29,1): "Manipulation_(psychology)", (29,2): "Dark_pattern",
    (29,3): "Nudge_theory", (29,4): "Persuasive_technology", (29,5): "Free_will",
    (29,6): "Advertising", (29,7): "Behavioral_economics",
    (30, 0): "AI_alignment", (30,1): "Control_problem_(AI)", (30,2): "Instrumental_convergence",
    (30,3): "Paperclip_maximizer", (30,4): "Value_alignment", (30,5): "AI_safety",
    (30,6): "Corrigibility", (30,7): "AI_alignment",
    (31, 0): "AI_governance", (31,1): "United_Nations", (31,2): "Democracy",
    (31,3): "Artificial_Intelligence_Act", (31,4): "Public_interest", (31,5): "International_law",
    (31,6): "Regulation", (31,7): "Global_governance",
    # World 5: AI in Context
    (32, 0): "Artificial_intelligence", (32,1): "Artificial_general_intelligence",
    (32,2): "AI_alignment", (32,3): "Existential_risk_from_artificial_intelligence",
    (32,4): "AI_governance", (32,5): "Human_identity", (32,6): "Generation_Z",
    (32,7): "Artificial_intelligence",
    (33, 0): "Artificial_general_intelligence", (33,1): "Artificial_general_intelligence",
    (33,2): "AI_alignment", (33,3): "Existential_risk_from_artificial_intelligence",
    (33,4): "OpenAI", (33,5): "Technological_singularity", (33,6): "Artificial_general_intelligence",
    (33,7): "Future",
    (34, 0): "AI_alignment", (34,1): "AI_safety", (34,2): "Existential_risk_from_artificial_intelligence",
    (34,3): "AI_alignment", (34,4): "Racing_to_the_bottom", (34,5): "Safety_culture",
    (34,6): "AI_safety", (34,7): "Crisis",
    (35, 0): "Existential_risk_from_artificial_intelligence", (35,1): "Existential_risk",
    (35,2): "Extinction", (35,3): "Nuclear_weapon", (35,4): "Risk_assessment",
    (35,5): "Long-termism", (35,6): "Existential_risk_from_artificial_intelligence",
    (35,7): "Future",
    (36, 0): "Artificial_Intelligence_Act", (36,1): "Regulation", (36,2): "United_States_Congress",
    (36,3): "International_organization", (36,4): "Technical_standard", (36,5): "Regulatory_compliance",
    (36,6): "Governance", (36,7): "Policy",
    (37, 0): "Human", (37,1): "Consciousness", (37,2): "Identity_(social_science)",
    (37,3): "Creativity", (37,4): "Philosophy_of_mind", (37,5): "Transhumanism",
    (37,6): "Human_nature", (37,7): "Artificial_intelligence",
    (38, 0): "Generation_Z", (38,1): "Future_generations", (38,2): "Climate_change",
    (38,3): "Technology", (38,4): "Responsibility", (38,5): "Intergenerational_equity",
    (38,6): "Youth", (38,7): "Future",
    (39, 0): "Activism", (39,1): "Civic_engagement", (39,2): "Collective_action",
    (39,3): "Call_to_action", (39,4): "Agency_(sociology)", (39,5): "Social_change",
    (39,6): "Digital_activism", (39,7): "Future",
    # World 6: How Neural Networks Work
    (40, 0): "Perceptron", (40,1): "Artificial_neuron", (40,2): "Mathematics",
    (40,3): "Matrix_multiplication", (40,4): "Activation_function", (40,5): "Sigmoid_function",
    (40,6): "Neuron", (40,7): "Computation",
    (41, 0): "Feedforward_neural_network", (41,1): "Signal_processing", (41,2): "Data_pipeline",
    (41,3): "Artificial_neural_network", (41,4): "Transformation", (41,5): "Feedforward_neural_network",
    (41,6): "Signal", (41,7): "Forward_pass",
    (42, 0): "Loss_function", (42,1): "Gradient_descent", (42,2): "Mean_squared_error",
    (42,3): "Optimization", (42,4): "Cross_entropy", (42,5): "Training_curve",
    (42,6): "Loss_function", (42,7): "Optimization_problem",
    (43, 0): "Backpropagation", (43,1): "Chain_rule", (43,2): "Automatic_differentiation",
    (43,3): "Gradient", (43,4): "Neural_network", (43,5): "Backpropagation",
    (43,6): "Weight", (43,7): "Learning_algorithm",
    (44, 0): "Activation_function", (44,1): "Rectifier_(neural_networks)",
    (44,2): "Sigmoid_function", (44,3): "Nonlinear_system", (44,4): "Threshold",
    (44,5): "Activation_function", (44,6): "Pattern", (44,7): "Neural_network",
    (45, 0): "Attention_(machine_learning)", (45,1): "Transformer_(deep_learning_architecture)",
    (45,2): "Selective_attention", (45,3): "Key-value_store", (45,4): "Attention_map",
    (45,5): "Focus", (45,6): "Attention_(machine_learning)", (45,7): "Transformer_(deep_learning_architecture)",
    (46, 0): "Transformer_(deep_learning_architecture)", (46,1): "Encoder–decoder_architecture",
    (46,2): "Positional_encoding", (46,3): "Multi-head_attention",
    (46,4): "Residual_neural_network", (46,5): "Feed-forward_network",
    (46,6): "Emergence", (46,7): "Neural_network",
    (47, 0): "Large_language_model", (47,1): "GPU_cluster", (47,2): "Data_center",
    (47,3): "Compute", (47,4): "Scaling_law", (47,5): "Training_data",
    (47,6): "Large_language_model", (47,7): "Artificial_intelligence",
    # World 7: Build With AI
    (48, 0): "Prompt_engineering", (48,1): "Natural_language_processing",
    (48,2): "Language_model", (48,3): "Prompt_engineering", (48,4): "Communication",
    (48,5): "Writing", (48,6): "Instruction", (48,7): "Input/output",
    (49, 0): "Prompt_engineering", (49,1): "Zero-shot_learning",
    (49,2): "Chain-of-thought_prompting", (49,3): "Few-shot_learning",
    (49,4): "Instruction_following", (49,5): "Template", (49,6): "Prompt_engineering",
    (49,7): "Engineering",
    (50, 0): "Application_programming_interface", (50,1): "Representational_state_transfer",
    (50,2): "Software_development_kit", (50,3): "API", (50,4): "HTTP",
    (50,5): "Integration", (50,6): "API", (50,7): "Software_engineering",
    (51, 0): "Retrieval-augmented_generation", (51,1): "Information_retrieval",
    (51,2): "Database", (51,3): "Knowledge_base", (51,4): "Retrieval-augmented_generation",
    (51,5): "Search_engine", (51,6): "Document_retrieval", (51,7): "RAG",
    (52, 0): "Fine-tuning_(deep_learning)", (52,1): "Transfer_learning",
    (52,2): "Domain_adaptation", (52,3): "Fine-tuning_(deep_learning)",
    (52,4): "Training_data", (52,5): "Adaptation", (52,6): "Model", (52,7): "Deep_learning",
    (53, 0): "Intelligent_agent", (53,1): "Autonomous_agent",
    (53,2): "ReAct_(language_model)", (53,3): "Tool_use", (53,4): "Planning",
    (53,5): "Automation", (53,6): "Intelligent_agent", (53,7): "Agent",
    (54, 0): "Evaluation", (54,1): "Benchmark_(computing)", (54,2): "Performance_indicator",
    (54,3): "Human_evaluation", (54,4): "Red_team", (54,5): "Metric",
    (54,6): "Quality_assurance", (54,7): "Assessment",
    (55, 0): "Responsible_AI", (55,1): "AI_ethics", (55,2): "Inclusive_design",
    (55,3): "Documentation", (55,4): "Software_release_life_cycle",
    (55,5): "Safety_engineering", (55,6): "Checklist", (55,7): "Ethics",
    # World 8: The Frontier
    (56, 0): "Multimodal_learning", (56,1): "DALL-E", (56,2): "GPT-4",
    (56,3): "Vision_transformer", (56,4): "Audio_processing", (56,5): "Multimodal_learning",
    (56,6): "Generative_AI", (56,7): "Artificial_intelligence",
    (57, 0): "Multi-agent_system", (57,1): "Autonomous_agent", (57,2): "AutoGPT",
    (57,3): "Distributed_computing", (57,4): "Orchestration_(computing)",
    (57,5): "Swarm_intelligence", (57,6): "Autonomous_agent", (57,7): "Automation",
    (58, 0): "Large_language_model", (58,1): "GPT-4", (58,2): "Claude_(language_model)",
    (58,3): "Frontier_model", (58,4): "Capability", (58,5): "Research",
    (58,6): "Progress", (58,7): "Artificial_intelligence",
    (59, 0): "AlphaFold", (59,1): "Protein_structure_prediction",
    (59,2): "Climate_model", (59,3): "Drug_discovery", (59,4): "Astronomy",
    (59,5): "Genomics", (59,6): "Scientific_method", (59,7): "Science",
    (60, 0): "Robotics", (60,1): "Boston_Dynamics", (60,2): "Humanoid_robot",
    (60,3): "Robot_arm", (60,4): "Embodied_cognition", (60,5): "Autonomous_robot",
    (60,6): "Robotics", (60,7): "Android_(robot)",
    (61, 0): "AI_safety", (61,1): "Interpretability", (61,2): "Red_team",
    (61,3): "AI_alignment", (61,4): "Adversarial_machine_learning",
    (61,5): "Safety_engineering", (61,6): "Research", (61,7): "Future",
    (62, 0): "Geopolitics", (62,1): "Technology_competition", (62,2): "Semiconductor_industry",
    (62,3): "National_security", (62,4): "International_relations",
    (62,5): "Export_control", (62,6): "Global_governance", (62,7): "Power_(international_relations)",
    (63, 0): "Future", (63,1): "Technological_singularity", (63,2): "Optimism",
    (63,3): "Technology", (63,4): "Innovation", (63,5): "Society",
    (63,6): "Human", (63,7): "Artificial_intelligence",
}


def get_wikipedia_image(article_title):
    """Fetch the main thumbnail image URL from a Wikipedia article."""
    # First try REST summary API (fastest)
    encoded = urllib.parse.quote(article_title.replace(' ', '_'))
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'PAI-educational-app/1.0 (https://github.com/rafaelmaitraavalos-lang/pai-app; rafaelmaitraavalos@gmail.com)',
        'Accept': 'application/json',
    })
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read())
        return data.get('thumbnail', {}).get('source', '')
    except:
        return ''


def fetch_slide(lesson_id, slide_idx, article_title):
    lesson_dir = os.path.join(OUT, f"lesson-{lesson_id}")
    os.makedirs(lesson_dir, exist_ok=True)
    dest = os.path.join(lesson_dir, f"slide-{slide_idx}.jpg")
    if os.path.exists(dest):
        return 'exists'

    img_url = get_wikipedia_image(article_title)
    if not img_url:
        return 'no_image'

    try:
        req = urllib.request.Request(img_url, headers={
            'User-Agent': 'PAI-educational-app/1.0',
            'Referer': 'https://en.wikipedia.org/',
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
        # Reject if too small (< 5KB = probably a placeholder/icon)
        if len(data) < 5000:
            return 'too_small'
        with open(dest, 'wb') as f:
            f.write(data)
        return 'ok'
    except Exception as e:
        return f'error:{e}'


print(f"Fetching {len(WIKI_ARTICLES)} slide images from Wikipedia...\n")
ok = skip = fail = 0

for (lid, si), article in sorted(WIKI_ARTICLES.items()):
    status = fetch_slide(lid, si, article)
    if status == 'ok':
        print(f"  L{lid:02d}·S{si+1} ✓  {article}")
        ok += 1
    elif status == 'exists':
        skip += 1
    else:
        print(f"  L{lid:02d}·S{si+1} ✗  {article}  [{status}]")
        fail += 1
    time.sleep(0.2)

print(f"\n✓ {ok} downloaded  ↷ {skip} skipped  ✗ {fail} failed")
print(f"Images in: public/images/lessons/lesson-{{id}}/slide-{{n}}.jpg")
