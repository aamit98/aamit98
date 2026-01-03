-- Create courses table
CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    semester VARCHAR(50),
    credits INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, DROPPED
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_courses_user_id ON courses(user_id);

-- Create topics table
CREATE TABLE topics (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    parent_topic_id BIGINT REFERENCES topics(id) ON DELETE SET NULL,
    mastery_level VARCHAR(20) DEFAULT 'NOT_STARTED', -- NOT_STARTED, LEARNING, PRACTICING, MASTERED
    time_spent_minutes INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_topics_course_id ON topics(course_id);

-- Create exams table
CREATE TABLE exams (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    exam_date TIMESTAMP NOT NULL,
    weight DECIMAL(5,2), -- percentage
    scope TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'UPCOMING', -- UPCOMING, DONE, MISSED
    grade DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_exams_course_id ON exams(course_id);
CREATE INDEX idx_exams_exam_date ON exams(exam_date);

-- Create study sessions table
CREATE TABLE study_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE SET NULL,
    topic_id BIGINT REFERENCES topics(id) ON DELETE SET NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_course_id ON study_sessions(course_id);

-- Create question bank table
CREATE TABLE question_bank (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id BIGINT REFERENCES topics(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    answer TEXT,
    difficulty VARCHAR(20), -- EASY, MEDIUM, HARD
    tags TEXT[],
    last_reviewed TIMESTAMP,
    next_review TIMESTAMP,
    review_count INTEGER DEFAULT 0,
    confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 5),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_question_bank_user_id ON question_bank(user_id);
CREATE INDEX idx_question_bank_topic_id ON question_bank(topic_id);
CREATE INDEX idx_question_bank_next_review ON question_bank(next_review);
