#pragma once
#include <glad/glad.h>
#include <vector>

class VertexBuffer {
 public:
    unsigned int ID;
    VertexBuffer(const std::vector<float>& data);
    VertexBuffer(const float* data, const size_t size);
    void bind();
    void unbind();
};

VertexBuffer::VertexBuffer(const std::vector<float>& data) {
    glGenBuffers(1, &ID);
    bind();
    glBufferData(GL_ARRAY_BUFFER, data.size() * sizeof(float), &(*data.begin()), GL_STATIC_DRAW);
    unbind();
}

VertexBuffer::VertexBuffer(const float* data, const size_t size) {
    glGenBuffers(1, &ID);
    bind();
    glBufferData(GL_ARRAY_BUFFER, size * sizeof(float), data, GL_STATIC_DRAW);
    unbind();
}

void VertexBuffer::bind() {
    glBindBuffer(GL_ARRAY_BUFFER, ID);
}

void VertexBuffer::unbind() {
    glBindBuffer(GL_ARRAY_BUFFER, 0);
}