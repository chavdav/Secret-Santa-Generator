package com.temporary.santa.dbmgmt.user;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import com.temporary.santa.dbmgmt.group.Group;
import com.temporary.santa.dbmgmt.group.GroupRepository;
import com.temporary.santa.dbmgmt.user.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private UserRepository userRepository;
	
	public User createUser(User user) {
			return userRepository.insert(user);
	}

	public Group addToGroup(String groupId, String groupPass, User u) {
		Group g; 
		
		try {
			g= groupRepository.findById(groupId).get();
		} catch (NoSuchElementException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Missing group", e);
		}
		
		if(!groupPass.equals(g.getGroupPass())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
		}
		
		if(g.getUsers().contains(u)) {
			System.out.println("User " + u + " already added to Group " + g);
			return g;
		}
		
		g.addUser(u);
		groupRepository.save(g);
		return g;
	}
}
