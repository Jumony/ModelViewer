#pragma once

#include <vector>
#include "VertexBuffer.h"

class VertexArray {
 public:
    unsigned int ID;
    VertexArray();
    void bind();
    void unbind();
    void glLinkVBO(VertexBuffer VBO, GLuint index, GLuint size, GLenum type, GLboolean normalized, GLsizei stride, const void* pointer);
};

VertexArray::VertexArray() {
    glGenVertexArrays(1, &ID);
}

void VertexArray::bind() {
    glBindVertexArray(ID);
}

void VertexArray::unbind() {
    glBindVertexArray(0);
}

void VertexArray::glLinkVBO(VertexBuffer VBO, GLuint index, GLuint size, GLenum type, GLboolean normalized, GLsizei stride, const void* pointer) {
    VBO.bind();
    glVertexAttribPointer(index, size, type, normalized, stride, pointer);
    glEnableVertexAttribArray(index);
    VBO.unbind();
}