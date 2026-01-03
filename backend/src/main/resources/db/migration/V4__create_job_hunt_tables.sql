-- Create applications table (job applications)
CREATE TABLE applications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    job_url TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'WISHLIST', -- WISHLIST, APPLIED, HR_SCREEN, TECH_SCREEN, TAKE_HOME, ONSITE, OFFER, REJECTED
    applied_date DATE,
    resume_version VARCHAR(100),
    cover_letter TEXT,
    notes TEXT,
    next_action VARCHAR(255),
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_applied_date ON applications(applied_date);

-- Create interviews table
CREATE TABLE interviews (
    id BIGSERIAL PRIMARY KEY,
    application_id BIGINT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    interview_date TIMESTAMP NOT NULL,
    stage VARCHAR(50) NOT NULL, -- HR, PHONE_SCREEN, TECH_INTERVIEW, SYSTEM_DESIGN, BEHAVIORAL, ONSITE
    interviewer_name VARCHAR(255),
    questions_asked TEXT,
    my_answers TEXT,
    feedback TEXT,
    went_well TEXT,
    to_improve TEXT,
    next_action VARCHAR(255),
    status VARCHAR(20) DEFAULT 'SCHEDULED', -- SCHEDULED, COMPLETED, CANCELLED
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interviews_application_id ON interviews(application_id);
CREATE INDEX idx_interviews_interview_date ON interviews(interview_date);

-- Create leetcode problems table
CREATE TABLE leetcode_problems (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    difficulty VARCHAR(20), -- EASY, MEDIUM, HARD
    pattern_tags TEXT[], -- Array: "two_pointers", "binary_search", "dp", etc.
    status VARCHAR(20) DEFAULT 'TODO', -- TODO, ATTEMPTED, SOLVED, MASTERED
    time_spent_minutes INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    last_attempted TIMESTAMP,
    confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 5),
    my_solution TEXT,
    notes TEXT,
    url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_leetcode_problems_user_id ON leetcode_problems(user_id);
CREATE INDEX idx_leetcode_problems_status ON leetcode_problems(status);
CREATE INDEX idx_leetcode_problems_difficulty ON leetcode_problems(difficulty);
