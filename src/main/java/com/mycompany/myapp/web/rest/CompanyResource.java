package com.mycompany.myapp.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Company;
import com.mycompany.myapp.security.jwt.JWTConfigurer;
import com.mycompany.myapp.security.jwt.TokenProvider;
import com.mycompany.myapp.service.CompanyService;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;

import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;

/**
 * REST controller for managing Company.
 */
@RestController
@RequestMapping("/api")
public class CompanyResource {

    private static final String ENTITY_NAME = "company";

    private final Logger log = LoggerFactory.getLogger(CompanyResource.class);

    private final HttpServletRequest request;

    private final CompanyService companyService;

    private final TokenProvider tokenProvider;

    public CompanyResource(CompanyService companyService, HttpServletRequest request, TokenProvider tokenProvider) {
        this.companyService = companyService;
        this.request = request;
        this.tokenProvider = tokenProvider;
    }

    private String resolveToken() {
        String bearerToken = request.getHeader(JWTConfigurer.AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }

        return null;
    }

    /**
     * POST /companies : Create a new company.
     *
     * @param company
     *            the company to create
     * @return the ResponseEntity with status 201 (Created) and with body the new company, or with status 400 (Bad Request) if the company has already an ID
     * @throws URISyntaxException
     *             if the Location URI syntax is incorrect
     */
    @PostMapping("/companies")
    @Timed
    public ResponseEntity<Company> createCompany(@Valid @RequestBody Company company) throws URISyntaxException {
        log.debug("REST request to save Company : {}", company);

        String jwt = resolveToken();
        Long companyId = this.tokenProvider.getCompanyId(jwt);

        if (company.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new company cannot already have an ID")).body(null);
        }
        Company result = companyService.save(company);
        return ResponseEntity.created(new URI("/api/companies/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /companies : Updates an existing company.
     *
     * @param company
     *            the company to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated company,
     *         or with status 400 (Bad Request) if the company is not valid,
     *         or with status 500 (Internal Server Error) if the company couldn't be updated
     * @throws URISyntaxException
     *             if the Location URI syntax is incorrect
     */
    @PutMapping("/companies")
    @Timed
    public ResponseEntity<Company> updateCompany(@Valid @RequestBody Company company) throws URISyntaxException {
        log.debug("REST request to update Company : {}", company);
        if (company.getId() == null) {
            return createCompany(company);
        }
        Company result = companyService.save(company);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, company.getId().toString()))
                .body(result);
    }

    /**
     * GET /companies : get all the companies.
     *
     * @param pageable
     *            the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of companies in body
     */
    @GetMapping("/companies")
    @Timed
    public ResponseEntity<List<Company>> getAllCompanies(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Companies");
        Page<Company> page = companyService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/companies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET /companies/:id : get the "id" company.
     *
     * @param id
     *            the id of the company to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the company, or with status 404 (Not Found)
     */
    @GetMapping("/companies/{id}")
    @Timed
    public ResponseEntity<Company> getCompany(@PathVariable Long id) {
        log.debug("REST request to get Company : {}", id);
        Company company = companyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(company));
    }

    /**
     * DELETE /companies/:id : delete the "id" company.
     *
     * @param id
     *            the id of the company to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/companies/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        log.debug("REST request to delete Company : {}", id);
        companyService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH /_search/companies?query=:query : search for the company corresponding
     * to the query.
     *
     * @param query
     *            the query of the company search
     * @param pageable
     *            the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/companies")
    @Timed
    public ResponseEntity<List<Company>> searchCompanies(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Companies for query {}", query);
        Page<Company> page = companyService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/companies");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
