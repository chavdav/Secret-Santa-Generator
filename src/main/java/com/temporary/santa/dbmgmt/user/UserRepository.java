package com.temporary.santa.dbmgmt.user;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.temporary.santa.dbmgmt.group.Group;

public interface UserRepository extends MongoRepository<User, String> {
}
