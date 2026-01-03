-- Create tasks table
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- STUDY, LEETCODE, JOB_PREP, INTERVIEW, PERSONAL
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, CRITICAL
    status VARCHAR(20) NOT NULL DEFAULT 'TODO', -- TODO, IN_PROGRESS, BLOCKED, DONE
    due_date TIMESTAMP,
    estimate_minutes INTEGER,
    actual_minutes INTEGER,
    tags TEXT[], -- Array of tags
    related_course_id BIGINT,
    related_application_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- Create calendar blocks table
CREATE TABLE calendar_blocks (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    label VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- DEEP_WORK, STUDY, BREAK, SLEEP, WORK, GYM, etc.
    task_id BIGINT REFERENCES tasks(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_calendar_blocks_user_id ON calendar_blocks(user_id);
CREATE INDEX idx_calendar_blocks_start_time ON calendar_blocks(start_time);
